import Anthropic from '@anthropic-ai/sdk'
import { buildGenerationPrompt, buildTopicSuggestionPrompt, Tone, Category } from './prompts'
import { createPost, generateSlug, estimateReadTime, getAllPosts } from '../blog-store'
import { fetchCoverImageByCategory, fetchMultipleImages } from './image-service'
import { searchYouTubeVideo, generateVideoEmbed } from './video-service'
import { checkAndFixFormatting } from './format-checker'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export interface GenerateOptions {
  topic: string
  tone: Tone
  category: Category
  publishImmediately?: boolean
}

export interface GeneratedPost {
  title: string
  excerpt: string
  content: string
  category: string
  categoryColor: Category
  suggestedImages?: string[]
  suggestedVideo?: string | null
}

export interface TopicSuggestion {
  title: string
  category: Category
  angle: string
}

export async function generateBlogPost(options: GenerateOptions) {
  const { topic, tone, category, publishImmediately = false } = options

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not configured')
  }

  const prompt = buildGenerationPrompt(topic, tone, category)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const textContent = response.content.find((block) => block.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from AI')
  }

  const rawResponse = textContent.text.trim()

  // Parse the JSON response
  let generated: GeneratedPost
  try {
    // Try to extract JSON if wrapped in code blocks
    const jsonMatch = rawResponse.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    generated = JSON.parse(jsonMatch[0])
  } catch (parseError) {
    console.error('Failed to parse AI response:', rawResponse)
    throw new Error('Failed to parse AI response as JSON')
  }

  // Validate required fields
  if (!generated.title || !generated.content) {
    throw new Error('AI response missing required fields (title, content)')
  }

  // Process media placeholders in content
  let enrichedContent = generated.content

  // 1. Process image placeholders: ![IMAGE: description]
  const imageMatches = [...enrichedContent.matchAll(/!\[IMAGE:\s*(.+?)\]/g)]
  if (imageMatches.length > 0) {
    const descriptions = imageMatches.map(match => match[1])
    const imageMap = await fetchMultipleImages(descriptions)

    for (const match of imageMatches) {
      const description = match[1]
      const imageUrl = imageMap.get(description)
      if (imageUrl) {
        // Replace placeholder with actual markdown image
        enrichedContent = enrichedContent.replace(
          match[0],
          `![${description}](${imageUrl})`
        )
      } else {
        // Remove placeholder if no image found
        enrichedContent = enrichedContent.replace(match[0], '')
      }
    }
  }

  // 2. Process video placeholder: [VIDEO: query]
  const videoMatch = enrichedContent.match(/\[VIDEO:\s*(.+?)\]/)
  let videoWarning: string | null = null
  if (videoMatch) {
    const videoQuery = videoMatch[1]

    // Check if YouTube API is configured
    if (!process.env.YOUTUBE_API_KEY) {
      console.warn('[Generator] YOUTUBE_API_KEY not configured - video embed skipped')
      videoWarning = `Video embed skipped: YouTube API key not configured. Search query was: "${videoQuery}"`
      enrichedContent = enrichedContent.replace(videoMatch[0], '')
    } else {
      const video = await searchYouTubeVideo(videoQuery)
      if (video) {
        // Replace placeholder with video embed
        enrichedContent = enrichedContent.replace(
          videoMatch[0],
          generateVideoEmbed(video)
        )
      } else {
        // Remove placeholder if no video found
        console.warn(`[Generator] No YouTube video found for query: "${videoQuery}"`)
        enrichedContent = enrichedContent.replace(videoMatch[0], '')
      }
    }
  }

  // Clean up any extra blank lines from removed placeholders
  enrichedContent = enrichedContent.replace(/\n{4,}/g, '\n\n\n')

  // 3. Auto-fix formatting issues
  const formatResult = await checkAndFixFormatting(enrichedContent)
  if (formatResult.wasModified) {
    enrichedContent = formatResult.fixedContent
    console.log(`[Generator] Auto-fixed ${formatResult.issuesFound.length} formatting issues:`, formatResult.issuesFound)
  }

  // 4. Fetch cover image - use first inline image or fetch new one
  let coverImage: string | null = null

  // Check if we already have inline images, use the first one as cover
  const inlineImageMatch = enrichedContent.match(/!\[.+?\]\((.+?)\)/)
  if (inlineImageMatch) {
    coverImage = inlineImageMatch[1]
  } else {
    // Fetch a separate cover image
    coverImage = await fetchCoverImageByCategory(topic, category)
  }

  // Create the blog post
  const slug = generateSlug(generated.title)
  const readTime = estimateReadTime(enrichedContent)
  const now = new Date()

  const savedPost = await createPost({
    slug,
    title: generated.title,
    excerpt: generated.excerpt || '',
    category: generated.category || category,
    categoryColor: (generated.categoryColor || category) as Category,
    date: now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime,
    content: enrichedContent,
    coverImage: coverImage || undefined,
    published: publishImmediately,
  })

  return {
    post: savedPost,
    generated: {
      ...generated,
      content: enrichedContent,
    },
    warnings: videoWarning ? [videoWarning] : [],
  }
}

export async function suggestTopics(count: number = 5, category?: Category): Promise<TopicSuggestion[]> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not configured')
  }

  // Get existing post titles to avoid duplicates
  const existingPosts = await getAllPosts()
  const existingTopics = existingPosts.map(p => p.title)

  const prompt = buildTopicSuggestionPrompt(existingTopics, category)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const textContent = response.content.find((block) => block.type === 'text')
  if (!textContent || textContent.type !== 'text') {
    throw new Error('No text response from AI')
  }

  const rawResponse = textContent.text.trim()

  try {
    const jsonMatch = rawResponse.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }
    const parsed = JSON.parse(jsonMatch[0])
    return (parsed.topics || []).slice(0, count)
  } catch (parseError) {
    console.error('Failed to parse topic suggestions:', rawResponse)
    throw new Error('Failed to parse topic suggestions')
  }
}

export async function generateFromSuggestion(suggestion: TopicSuggestion, tone: Tone) {
  return generateBlogPost({
    topic: `${suggestion.title} - ${suggestion.angle}`,
    tone,
    category: suggestion.category,
  })
}
