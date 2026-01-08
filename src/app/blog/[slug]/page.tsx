import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/blog-store'
import BlogPostClient from './blog-post-client'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  const post = await getPostBySlug(slug)

  // Allow viewing if published OR in preview mode
  if (!post || (!post.published && !isPreview)) {
    notFound()
  }

  return <BlogPostClient post={post} isPreview={isPreview} />
}
