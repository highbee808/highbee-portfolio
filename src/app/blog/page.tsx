import { getPublishedPosts } from '@/lib/blog-store'
import BlogListClient from './blog-list-client'

// Force dynamic rendering (requires Supabase at runtime)
export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return <BlogListClient posts={posts} />
}
