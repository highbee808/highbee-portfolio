interface PexelsPhoto {
  src: {
    original: string
    large2x: string
    large: string
    medium: string
  }
  photographer: string
  alt: string
}

interface PexelsResponse {
  photos: PexelsPhoto[]
  total_results: number
}

/**
 * Fetches a relevant cover image from Pexels API based on the topic
 * Returns the image URL or null if no image found/API fails
 */
export async function fetchCoverImage(topic: string): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY

  if (!apiKey) {
    console.warn('PEXELS_API_KEY not configured - skipping image fetch')
    return null
  }

  try {
    // Extract meaningful keywords from the topic (skip common words)
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'that', 'which', 'who', 'whom', 'this', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'how', 'why', 'when', 'where', 'my', 'your', 'his', 'her', 'its', 'our', 'their']

    const keywords = topic
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .split(/\s+/)
      .filter(word => word.length > 3 && !stopWords.includes(word))
      .slice(0, 3) // Take top 3 keywords
      .join(' ')

    if (!keywords) {
      // Fallback to generic tech-related search
      return fetchGenericTechImage()
    }

    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(keywords)}&per_page=5&orientation=landscape`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    )

    if (!response.ok) {
      console.error('Pexels API error:', response.status, response.statusText)
      return fetchGenericTechImage()
    }

    const data: PexelsResponse = await response.json()

    if (data.photos && data.photos.length > 0) {
      // Pick a random photo from the results for variety
      const randomIndex = Math.floor(Math.random() * Math.min(data.photos.length, 3))
      return data.photos[randomIndex].src.large2x || data.photos[randomIndex].src.large
    }

    // No results for topic, try generic tech image
    return fetchGenericTechImage()
  } catch (error) {
    console.error('Failed to fetch cover image:', error)
    return null
  }
}

/**
 * Fetches a generic tech/coding related image as fallback
 */
async function fetchGenericTechImage(): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY

  if (!apiKey) return null

  const techQueries = ['coding', 'technology', 'computer', 'programming', 'software development']
  const randomQuery = techQueries[Math.floor(Math.random() * techQueries.length)]

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(randomQuery)}&per_page=5&orientation=landscape`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    )

    if (!response.ok) return null

    const data: PexelsResponse = await response.json()

    if (data.photos && data.photos.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(data.photos.length, 3))
      return data.photos[randomIndex].src.large2x || data.photos[randomIndex].src.large
    }

    return null
  } catch {
    return null
  }
}

/**
 * Fetches an image based on category for more relevant results
 */
export async function fetchCoverImageByCategory(
  topic: string,
  category: 'ai' | 'typescript' | 'design' | 'general'
): Promise<string | null> {
  // Add category-specific keywords to improve relevance
  const categoryKeywords: Record<string, string> = {
    ai: 'artificial intelligence technology',
    typescript: 'coding programming developer',
    design: 'design creative ui ux',
    general: 'technology software development',
  }

  const enhancedTopic = `${topic} ${categoryKeywords[category] || ''}`
  return fetchCoverImage(enhancedTopic)
}

/**
 * Fetches multiple images based on an array of descriptions
 * Returns a map of description -> image URL
 */
export async function fetchMultipleImages(
  descriptions: string[]
): Promise<Map<string, string>> {
  const results = new Map<string, string>()
  const apiKey = process.env.PEXELS_API_KEY

  if (!apiKey) {
    console.warn('PEXELS_API_KEY not configured - skipping multi-image fetch')
    return results
  }

  // Limit to 3 images to avoid rate limiting
  const limitedDescriptions = descriptions.slice(0, 3)

  // Fetch images in parallel but with a small delay between requests
  for (let i = 0; i < limitedDescriptions.length; i++) {
    const description = limitedDescriptions[i]

    try {
      // Add a small delay to avoid rate limiting
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 200))
      }

      const imageUrl = await fetchCoverImage(description)
      if (imageUrl) {
        results.set(description, imageUrl)
      }
    } catch (error) {
      console.error(`Failed to fetch image for "${description}":`, error)
    }
  }

  return results
}
