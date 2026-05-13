import type { Metadata } from 'next'
import { getPublishedPosts } from '@/lib/blog-store'
import BlogListClient from './blog-list-client'

// Force dynamic rendering (requires Supabase at runtime)
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical articles on AI integration, Next.js, TypeScript, product development, and building useful web applications.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Highbee Blog',
    description:
      'Practical articles on AI integration, Next.js, TypeScript, and product development.',
    url: '/blog',
    type: 'website',
  },
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return <BlogListClient posts={posts} />
}
