import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { createPost, getAllPosts } from '@/lib/blog-store'

export async function GET() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const posts = await getAllPosts()
  return NextResponse.json(posts)
}

export async function POST(req: NextRequest) {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()

    if (!data.title || !data.slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
    }

    const post = await createPost({
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt || '',
      category: data.category || 'General',
      categoryColor: data.categoryColor || 'general',
      date: data.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: data.readTime || '1 min read',
      coverImage: data.coverImage,
      content: data.content || '',
      published: data.published || false,
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Create post error:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
