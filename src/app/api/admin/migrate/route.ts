import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { isAuthenticated } from '@/lib/auth'

// Existing blog posts to migrate
const EXISTING_POSTS = [
  {
    "slug": "building-an-ai-chat-widget-that-actually-converts-visitors",
    "title": "Building an AI Chat Widget That Actually Converts Visitors",
    "excerpt": "I spent three weeks building a chat widget that would make visitors stay longer. Here's what I learned about AI conversations that actually work.",
    "category": "AI Development",
    "categoryColor": "ai",
    "date": "January 8, 2026",
    "readTime": "6 min read",
    "content": "You know that feeling when someone lands on your portfolio and leaves in 10 seconds? Yeah, I was tired of it too.\n\nI'd been watching my analytics for months, seeing decent traffic but terrible engagement. People would hit my homepage and bounce faster than a bad date. Something had to change.\n\nThat's when I decided to build an AI chat widget. Not one of those generic \"How can I help you?\" things that everyone ignores, but something that would actually start conversations about my work.\n\n## Why Most Chat Widgets Fail (And What I Did Differently)\n\nHere's the thing about most portfolio chat widgets – they're built backwards. They wait for visitors to ask questions instead of proactively engaging with what people actually want to know.\n\nI spent a week analyzing the emails and messages I get from potential clients. Turns out, 90% of them ask the same five questions:\n- What's your experience with [specific technology]?\n- How long would a project like [their idea] take?\n- What's your typical project process?\n- Can you show me similar work you've done?\n- What are your rates?\n\nSo instead of building a reactive chat bot, I built one that anticipates these questions and steers conversations toward them naturally.\n\n## The Technical Stack (Keep It Simple)\n\nI went with a surprisingly minimal setup:\n\n```typescript\n// Core dependencies\n{\n  \"@anthropic-ai/sdk\": \"^0.20.0\",\n  \"next\": \"^14.0.0\",\n  \"react\": \"^18.0.0\",\n  \"framer-motion\": \"^10.16.0\"\n}\n```\n\nYeah, that's it. No complex state management, no fancy chat libraries. Just Claude's API, Next.js for the backend route, and Framer Motion for smooth animations.\n\nThe widget itself is a floating button that expands into a chat interface. I've seen too many widgets that take over the entire screen – nobody wants that.",
    "published": true,
    "featuredOnHomepage": true,
    "id": "mk4u69f39ghoxkp2pbe",
    "createdAt": "2026-01-08T02:36:42.159Z",
    "updatedAt": "2026-01-08T02:43:05.470Z"
  },
  {
    "slug": "why-your-dark-mode-implementation-sucks-and-how-to-fix-it",
    "title": "Why Your Dark Mode Implementation Sucks (And How to Fix It)",
    "excerpt": "Most dark modes are just inverted colors that hurt your eyes. Here's how to build one that users actually want to keep enabled.",
    "category": "Design",
    "categoryColor": "design",
    "date": "January 8, 2026",
    "readTime": "5 min read",
    "content": "You've seen it everywhere. That jarring flash of white when switching to dark mode. The washed-out grays that make text barely readable. The neon blues that feel like staring into a flashlight.\n\nI've shipped dark mode features for three different products over the past two years, and I learned the hard way that flipping colors isn't enough.",
    "coverImage": "https://images.pexels.com/photos/35247198/pexels-photo-35247198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "published": true,
    "featuredOnHomepage": true,
    "id": "mk4uvmfinxbgane14h9",
    "createdAt": "2026-01-08T02:56:25.422Z",
    "updatedAt": "2026-01-08T02:58:32.205Z"
  },
  {
    "slug": "building-ai-agents-that-actually-work-in-production",
    "title": "Building AI Agents That Actually Work in Production",
    "excerpt": "Most AI agents fail spectacularly in production. After shipping 12+ agent systems, here's what separates the demos from the deployments.",
    "category": "AI Development",
    "categoryColor": "ai",
    "date": "January 8, 2026",
    "readTime": "5 min read",
    "content": "Your AI agent works perfectly in your local environment. It responds intelligently, handles edge cases gracefully, and impresses everyone in demos. Then you deploy it to production and... it starts hallucinating prices, gets stuck in infinite loops, and somehow convinced three customers that your refund policy is \"just ask nicely.\"\n\nI've been there. Multiple times.",
    "coverImage": "https://images.pexels.com/photos/7937744/pexels-photo-7937744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "published": true,
    "id": "mk5ddd9cvk8zdfte06",
    "createdAt": "2026-01-08T11:34:06.432Z",
    "updatedAt": "2026-01-08T11:45:12.950Z"
  },
  {
    "slug": "react-server-components-when-to-actually-use-them-and-when-to-skip-them",
    "title": "React Server Components: When to Actually Use Them (And When to Skip Them)",
    "excerpt": "Server Components aren't magic—they're a specific tool for specific problems. Here's when they actually make sense in your projects.",
    "category": "typescript",
    "categoryColor": "typescript",
    "date": "January 8, 2026",
    "readTime": "6 min read",
    "content": "Everyone's talking about React Server Components like they're the solution to every performance problem. But after implementing them in several production apps, I've learned they're more like a specialized tool than a universal upgrade.",
    "coverImage": "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    "published": false,
    "id": "mk5gbg4qu398i09wji",
    "createdAt": "2026-01-08T12:56:35.690Z",
    "updatedAt": "2026-01-08T12:56:35.690Z"
  }
]

// POST - Migrate data to Vercel KV
export async function POST(req: NextRequest) {
  const authenticated = await isAuthenticated()
  const apiKey = req.headers.get('x-api-key')
  const validApiKey = apiKey === process.env.BLOG_AGENT_API_KEY

  if (!authenticated && !validApiKey) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Check if data already exists
    const existingPosts = await kv.get('blog:posts')

    if (existingPosts && Array.isArray(existingPosts) && existingPosts.length > 0) {
      return NextResponse.json({
        message: 'Data already exists in KV',
        postsCount: existingPosts.length,
        skipped: true
      })
    }

    // Migrate blog posts
    await kv.set('blog:posts', EXISTING_POSTS)

    // Migrate topics with defaults
    const defaultTopics = {
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
          used: true,
          usedAt: new Date().toISOString(),
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

    await kv.set('blog:topics', defaultTopics)

    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      postsCount: EXISTING_POSTS.length,
      topicsCount: defaultTopics.topics.length
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
    const posts = await kv.get('blog:posts')
    const topics = await kv.get('blog:topics')

    return NextResponse.json({
      status: 'ok',
      posts: posts ? (Array.isArray(posts) ? posts.length : 0) : 0,
      topics: topics && typeof topics === 'object' && 'topics' in topics
        ? (topics as { topics: unknown[] }).topics.length
        : 0,
      kvConnected: true
    })
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      kvConnected: false
    })
  }
}
