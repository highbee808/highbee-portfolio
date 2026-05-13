import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/blog-store'
import { absoluteUrl, jsonLd } from '@/lib/seo'
import BlogPostClient from './blog-post-client'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'
  const post = await getPostBySlug(slug)

  if (!post || (!post.published && !isPreview)) {
    return {
      title: 'Post Not Found',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const image = absoluteUrl(post.coverImage || '/images/profile-cartoon.png')

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    robots: isPreview
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: ['Ibrahim Lawal'],
      section: post.category,
      images: [
        {
          url: image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  }
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

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.coverImage || '/images/profile-cartoon.png'),
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: {
      '@type': 'Person',
      name: 'Ibrahim Lawal',
      url: absoluteUrl('/'),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Highbee',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/profile-favicon.png'),
      },
    },
  }

  return (
    <>
      {!isPreview && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
        />
      )}
      <BlogPostClient post={post} isPreview={isPreview} />
    </>
  )
}
