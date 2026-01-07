import { redirect, notFound } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import { getPostById } from '@/lib/blog-store'
import { BlogPostEditor } from '@/components/admin/blog-post-editor'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect('/admin')
  }

  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return <BlogPostEditor post={post} />
}
