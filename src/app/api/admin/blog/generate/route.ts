import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { generateBlogPost, suggestTopics } from '@/lib/blog-agent/generator'
import { getTopicById, markTopicUsed, getPredefinedTopics, getRandomUnusedTopic } from '@/lib/blog-agent/topics'
import { Tone, Category } from '@/lib/blog-agent/prompts'
import { generateWithSEO, SEOGenerationReport } from '@/lib/blog-agent/seo-generator'

// POST - Generate a new blog post
export async function POST(req: NextRequest) {
  // Dual authentication: session (admin UI) or API key (cron/scheduled)
  const authenticated = await isAuthenticated()
  const apiKey = req.headers.get('x-api-key')
  const validApiKey = apiKey === process.env.BLOG_AGENT_API_KEY

  if (!authenticated && !validApiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const {
      topic,
      predefinedTopicId,
      suggestTopic: shouldSuggest,
      tone = 'conversational',
      category = 'general',
      publishImmediately = false,
      useSEO = false,
      skipQualityCheck = false,
      minSeoScore = 50,
    } = body as {
      topic?: string
      predefinedTopicId?: string
      suggestTopic?: boolean
      tone?: Tone
      category?: Category
      publishImmediately?: boolean
      useSEO?: boolean
      skipQualityCheck?: boolean
      minSeoScore?: number
    }

    // If SEO mode is enabled, use the SEO pipeline
    if (useSEO) {
      console.log('[Admin] Using SEO-powered generation pipeline...')
      const report: SEOGenerationReport = await generateWithSEO({
        forceTopic: topic,
        category,
        tone,
        autoPublish: publishImmediately,
        skipQualityCheck,
        minSeoScore,
      })

      if (!report.success) {
        return NextResponse.json(
          {
            error: 'SEO generation failed',
            details: report.errors,
            report,
          },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        usedSEO: true,
        post: report.result,
        topicSelection: {
          reason: report.topicSelection.selectionReason,
          seoScore: report.topicSelection.selectedTopic?.overallScore,
          breakdown: report.topicSelection.selectedTopic?.breakdown,
        },
        generation: report.generation,
        formatCheck: report.formatCheck,
        qualityCheck: report.qualityCheck,
        apiCalls: report.apiCalls,
      })
    }

    // Standard generation (non-SEO mode)
    let finalTopic: string
    let finalCategory: Category = category

    // Determine the topic source
    if (predefinedTopicId) {
      // Use predefined topic
      const predefined = await getTopicById(predefinedTopicId)
      if (!predefined) {
        return NextResponse.json({ error: 'Predefined topic not found' }, { status: 404 })
      }
      finalTopic = predefined.title
      finalCategory = predefined.category
      await markTopicUsed(predefinedTopicId)
    } else if (shouldSuggest) {
      // Let AI pick a random unused topic or suggest one
      const randomTopic = await getRandomUnusedTopic(category)
      if (randomTopic) {
        finalTopic = randomTopic.title
        finalCategory = randomTopic.category
        await markTopicUsed(randomTopic.id)
      } else {
        // No predefined topics available, generate one
        const suggestions = await suggestTopics(1, category)
        if (suggestions.length === 0) {
          return NextResponse.json({ error: 'Could not generate topic suggestion' }, { status: 500 })
        }
        finalTopic = suggestions[0].title
        finalCategory = suggestions[0].category
      }
    } else if (topic) {
      // Use custom topic
      finalTopic = topic
    } else {
      return NextResponse.json(
        { error: 'Must provide topic, predefinedTopicId, or set suggestTopic to true' },
        { status: 400 }
      )
    }

    // Generate the blog post
    const result = await generateBlogPost({
      topic: finalTopic,
      tone,
      category: finalCategory,
      publishImmediately,
    })

    return NextResponse.json({
      success: true,
      post: result.post,
      generated: result.generated,
      topicUsed: finalTopic,
    })
  } catch (error) {
    console.error('Blog generation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate blog post' },
      { status: 500 }
    )
  }
}

// GET - Get predefined topics or topic suggestions
export async function GET(req: NextRequest) {
  const authenticated = await isAuthenticated()
  const apiKey = req.headers.get('x-api-key')
  const validApiKey = apiKey === process.env.BLOG_AGENT_API_KEY

  if (!authenticated && !validApiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'predefined'
  const category = searchParams.get('category') as Category | null

  try {
    if (type === 'suggestions') {
      // Get AI-generated topic suggestions
      const count = parseInt(searchParams.get('count') || '5', 10)
      const suggestions = await suggestTopics(count, category || undefined)
      return NextResponse.json({ suggestions })
    } else {
      // Get predefined topics
      const topics = await getPredefinedTopics()
      const filtered = category
        ? topics.filter(t => t.category === category)
        : topics
      return NextResponse.json({ topics: filtered })
    }
  } catch (error) {
    console.error('Error fetching topics:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch topics' },
      { status: 500 }
    )
  }
}
