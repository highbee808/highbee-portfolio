import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { isAuthenticated } from '@/lib/auth'
import fs from 'fs/promises'
import path from 'path'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '',
})

// POST - Migrate data to Upstash Redis
export async function POST(req: NextRequest) {
  const authenticated = await isAuthenticated()
  const apiKey = req.headers.get('x-api-key')
  const validApiKey = apiKey === process.env.BLOG_AGENT_API_KEY

  if (!authenticated && !validApiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Read existing posts from JSON file
    const postsPath = path.join(process.cwd(), 'data', 'blog-posts.json')
    let posts = []

    try {
      const postsData = await fs.readFile(postsPath, 'utf-8')
      posts = JSON.parse(postsData)
    } catch {
      // File doesn't exist or is invalid, use empty array
      posts = []
    }

    // Read existing topics from JSON file
    const topicsPath = path.join(process.cwd(), 'data', 'blog-topics.json')
    let topicsData = { topics: [], lastUpdated: new Date().toISOString() }

    try {
      const topicsFile = await fs.readFile(topicsPath, 'utf-8')
      topicsData = JSON.parse(topicsFile)
    } catch {
      // Use default topics if file doesn't exist
      topicsData = {
        topics: [
          {
            id: 'ai-code-review',
            title: 'How AI is Revolutionizing Code Review',
            category: 'ai',
            suggestedTone: 'professional',
            keywords: ['AI', 'code review', 'automation', 'developer tools'],
            used: false,
            usedAt: null,
          },
          {
            id: 'typescript-generics',
            title: 'Mastering TypeScript Generics: From Basics to Advanced Patterns',
            category: 'typescript',
            suggestedTone: 'educational',
            keywords: ['TypeScript', 'generics', 'type safety', 'programming'],
            used: false,
            usedAt: null,
          },
          {
            id: 'design-system-tokens',
            title: 'Building a Design System with Design Tokens',
            category: 'design',
            suggestedTone: 'technical',
            keywords: ['design systems', 'design tokens', 'UI', 'consistency'],
            used: false,
            usedAt: null,
          },
          {
            id: 'prompt-engineering',
            title: 'Prompt Engineering Best Practices for Developers',
            category: 'ai',
            suggestedTone: 'conversational',
            keywords: ['prompt engineering', 'AI', 'LLM', 'ChatGPT'],
            used: false,
            usedAt: null,
          },
          {
            id: 'react-server-components',
            title: 'Understanding React Server Components',
            category: 'typescript',
            suggestedTone: 'educational',
            keywords: ['React', 'server components', 'Next.js', 'performance'],
            used: false,
            usedAt: null,
          },
          {
            id: 'micro-interactions',
            title: 'The Art of Micro-interactions in Web Design',
            category: 'design',
            suggestedTone: 'conversational',
            keywords: ['micro-interactions', 'UX', 'animation', 'web design'],
            used: false,
            usedAt: null,
          },
        ],
        lastUpdated: new Date().toISOString(),
      }
    }

    // Force overwrite - migrate blog posts to Redis
    await redis.set('blog:posts', posts)

    // Migrate topics to Redis
    await redis.set('blog:topics', topicsData)

    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      postsCount: posts.length,
      topicsCount: topicsData.topics?.length || 0
    })
  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Migration failed' },
      { status: 500 }
    )
  }
}

// GET - Check migration status
export async function GET(req: NextRequest) {
  const authenticated = await isAuthenticated()
  const apiKey = req.headers.get('x-api-key')
  const validApiKey = apiKey === process.env.BLOG_AGENT_API_KEY

  if (!authenticated && !validApiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const posts = await redis.get('blog:posts')
    const topics = await redis.get('blog:topics')

    return NextResponse.json({
      status: 'ok',
      posts: posts ? (Array.isArray(posts) ? posts.length : 0) : 0,
      topics: topics && typeof topics === 'object' && 'topics' in topics
        ? (topics as { topics: unknown[] }).topics.length
        : 0,
      redisConnected: true
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      redisConnected: false
    })
  }
}
