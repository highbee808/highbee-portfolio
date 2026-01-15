import Anthropic from '@anthropic-ai/sdk'
import { buildGenerationPrompt, buildTopicSuggestionPrompt, Tone, Category } from './prompts'
import { createPost, generateSlug, estimateReadTime, getAllPosts } from '../blog-store'
import { fetchCoverImageByCategory, fetchMultipleImages } from './image-service'
import { searchYouTubeVideo, generateVideoEmbed } from './video-service'
import { checkAndFixFormatting } from './format-checker'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

/**
 * Robustly parse AI response that may contain JSON
 * Handles: code blocks, unescaped characters, trailing commas
 */
function parseAIResponse(rawResponse: string): GeneratedPost {
  let jsonStr = rawResponse

  // 1. Remove markdown code blocks if present
  jsonStr = jsonStr.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')

  // 2. Try to extract JSON object
  const jsonMatch = jsonStr.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('No JSON object found in response')
  }
  jsonStr = jsonMatch[0]

  // 3. Try parsing as-is first
  try {
    return JSON.parse(jsonStr)
  } catch {
    // Continue to fixes
  }

  // 4. Fix common issues
  // Remove trailing commas before } or ]
  jsonStr = jsonStr.replace(/,(\s*[}\]])/g, '$1')

  // Try parsing again
  try {
    return JSON.parse(jsonStr)
  } catch {
    // Continue to more aggressive fixes
  }

  // 5. Try to fix unescaped newlines in content field
  // This is the most common issue - content has literal newlines instead of \n
  try {
    // Find the content field and properly escape it
    const contentMatch = jsonStr.match(/"content"\s*:\s*"([\s\S]*?)"\s*,\s*"category"/)
    if (contentMatch) {
      const originalContent = contentMatch[1]
      const fixedContent = originalContent
        .replace(/\\/g, '\\\\')  // Escape backslashes first
        .replace(/"/g, '\\"')    // Escape quotes
        .replace(/\n/g, '\\n')   // Escape newlines
        .replace(/\r/g, '\\r')   // Escape carriage returns
        .replace(/\t/g, '\\t')   // Escape tabs

      jsonStr = jsonStr.replace(
        /"content"\s*:\s*"[\s\S]*?"\s*,\s*"category"/,
        `"content": "${fixedContent}", "category"`
      )
    }

    return JSON.parse(jsonStr)
  } catch {
    // Last resort failed
  }

  // 6. Final attempt: try to extract fields manually
  try {
    const titleMatch = jsonStr.match(/"title"\s*:\s*"([^"]+)"/)
    const excerptMatch = jsonStr.match(/"excerpt"\s*:\s*"([^"]+)"/)
    const categoryMatch = jsonStr.match(/"category"\s*:\s*"([^"]+)"/)
    const categoryColorMatch = jsonStr.match(/"categoryColor"\s*:\s*"([^"]+)"/)

    // For content, find it between "content": " and the next field
    const contentStart = jsonStr.indexOf('"content"')
    const contentValueStart = jsonStr.indexOf('"', contentStart + 9) + 1
    let depth = 0
    let contentEnd = contentValueStart

    for (let i = contentValueStart; i < jsonStr.length; i++) {
      if (jsonStr[i] === '\\') {
        i++ // Skip escaped character
        continue
      }
      if (jsonStr[i] === '"' && depth === 0) {
        contentEnd = i
        break
      }
    }

    const content = jsonStr.substring(contentValueStart, contentEnd)
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')

    if (titleMatch && content) {
      return {
        title: titleMatch[1],
        excerpt: excerptMatch?.[1] || '',
        content: content,
        category: categoryMatch?.[1] || 'General',
        categoryColor: (categoryColorMatch?.[1] || 'general') as Category,
      }
    }
  } catch {
    // Manual extraction failed
  }

  throw new Error('Could not parse JSON after all attempts')
}

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

  // Parse the JSON response with robust error handling
  let generated: GeneratedPost
  try {
    generated = parseAIResponse(rawResponse)
  } catch (parseError) {
    console.error('Failed to parse AI response:', rawResponse.substring(0, 500))
    throw new Error('Failed to parse AI response as JSON. The AI may have generated invalid content. Please try again.')
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
