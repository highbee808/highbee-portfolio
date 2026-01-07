import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { BlogPostEditor } from '@/components/admin/blog-post-editor'

export default async function NewPostPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/admin')
  }

  return <BlogPostEditor />
}
