export interface YouTubeVideo {
  videoId: string
  title: string
  thumbnail: string
}

/**
 * Search YouTube for videos matching a query
 * Requires YOUTUBE_API_KEY environment variable
 */
export async function searchYouTubeVideo(query: string): Promise<YouTubeVideo | null> {
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) {
    console.log('YouTube API key not configured, skipping video search')
    return null
  }

  try {
    // Add programming/tech context to the query for better results
    const searchQuery = `${query} tutorial programming`

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `part=snippet&` +
      `q=${encodeURIComponent(searchQuery)}&` +
      `type=video&` +
      `maxResults=1&` +
      `relevanceLanguage=en&` +
      `videoEmbeddable=true&` +
      `key=${apiKey}`
    )

    if (!response.ok) {
      console.error('YouTube API error:', response.status)
      return null
    }

    const data = await response.json()

    if (!data.items || data.items.length === 0) {
      return null
    }

    const video = data.items[0]
    return {
      videoId: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url
    }
  } catch (error) {
    console.error('YouTube search error:', error)
    return null
  }
}

/**
 * Generate HTML embed code for a YouTube video
 */
export function generateVideoEmbed(video: YouTubeVideo): string {
  return `<div class="video-embed" data-video-id="${video.videoId}">
<iframe
  src="https://www.youtube.com/embed/${video.videoId}"
  title="${video.title.replace(/"/g, '&quot;')}"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
</div>`
}

/**
 * Generate markdown-style video placeholder that will be processed later
 */
export function generateVideoMarkdown(video: YouTubeVideo): string {
  return `\n\n[VIDEO_EMBED:${video.videoId}:${video.title}]\n\n`
}
