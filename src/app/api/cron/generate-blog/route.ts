import { NextRequest, NextResponse } from 'next/server'
import { generateWithSEO, SEOGenerationReport } from '@/lib/blog-agent/seo-generator'
import { Category } from '@/lib/blog-agent/prompts'

// Vercel cron jobs call this endpoint
// Schedule: Every Monday at 9am UTC (configured in vercel.json)
export async function GET(req: NextRequest) {
  // Verify the request is from Vercel Cron
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // Allow if: has valid CRON_SECRET, or has valid BLOG_AGENT_API_KEY (for manual testing)
  const apiKey = req.headers.get('x-api-key')
  const validApiKey = apiKey === process.env.BLOG_AGENT_API_KEY

  if (cronSecret && authHeader !== `Bearer ${cronSecret}` && !validApiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // If no CRON_SECRET is set, require API key
  if (!cronSecret && !validApiKey) {
    return NextResponse.json({ error: 'Unauthorized - API key required' }, { status: 401 })
  }

  try {
    // Get query params for customization (optional)
    const { searchParams } = new URL(req.url)
    const categoryParam = searchParams.get('category') as Category | null
    const autoPublish = searchParams.get('autoPublish') === 'true'
    const skipQuality = searchParams.get('skipQuality') === 'true'
    const minScore = parseInt(searchParams.get('minScore') || '50', 10)
    const forceTopic = searchParams.get('topic') || undefined

    console.log('[CRON] Starting SEO-powered blog generation...')

    // Use SEO-powered generation pipeline
    const report: SEOGenerationReport = await generateWithSEO({
      forceTopic,
      category: categoryParam || undefined,
      autoPublish,
      skipQualityCheck: skipQuality,
      minSeoScore: minScore,
    })

    if (!report.success) {
      console.error('[CRON] Blog generation failed:', report.errors)
      return NextResponse.json(
        {
          error: 'Generation failed',
          details: report.errors,
          report,
        },
        { status: 500 }
      )
    }

    console.log(`[CRON] Generated blog post: ${report.result?.title}`)
    console.log(`[CRON] Topic selection: ${report.topicSelection.selectionReason}`)
    console.log(`[CRON] API calls used: ${report.apiCalls.total}`)

    return NextResponse.json({
      success: true,
      message: 'Blog post generated successfully',
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
  } catch (error) {
    console.error('[CRON] Blog generation failed:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Generation failed' },
      { status: 500 }
    )
  }
}

// Also support POST for manual triggering via the admin API
export async function POST(req: NextRequest) {
  return GET(req)
}
