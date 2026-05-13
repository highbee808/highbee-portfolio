import type { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/blog-store'
import { SITE_URL } from '@/lib/seo'

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/projects', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/resume', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/projects/taskrite', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/projects/launchkit', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/projects/upvotely', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/projects/rentright', priority: 0.7, changeFrequency: 'monthly' },
] as const

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const posts = await getPublishedPosts()

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt || now),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
