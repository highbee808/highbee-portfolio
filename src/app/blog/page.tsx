import { getPublishedPosts } from '@/lib/blog-store'
import BlogListClient from './blog-list-client'

export default async function BlogPage() {
  const posts = await getPublishedPosts()

  return <BlogListClient posts={posts} />
}
