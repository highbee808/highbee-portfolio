import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upvotely Case Study',
  description:
    'Upvotely is a premium feature voting platform with real-time updates, theme support, and polished product interactions.',
  alternates: {
    canonical: '/projects/upvotely',
  },
  openGraph: {
    title: 'Upvotely Case Study',
    description:
      'A feature voting platform built with Next.js, Supabase, Framer Motion, and Radix UI.',
    url: '/projects/upvotely',
    type: 'article',
  },
}

export default function UpvotelyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
