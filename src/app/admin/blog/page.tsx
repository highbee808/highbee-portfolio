import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { getAllPosts } from '@/lib/blog-store'
import { BlogPostsList } from '@/components/admin/blog-posts-list'

export default async function AdminBlogPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/admin')
  }

  const posts = await getAllPosts()

  return <BlogPostsList posts={posts} />
}
