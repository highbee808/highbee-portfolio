import { getPublishedPosts } from '@/lib/blog-store'
import BlogListClient from './blog-list-client'

// Revalidate every 60 seconds to fetch fresh blog data
export const revalidate = 60

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return <BlogListClient posts={posts} />
}
