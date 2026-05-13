import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LaunchKit Case Study',
  description:
    'LaunchKit is a free legal document generator with 15 document types, PWA support, and Safari-optimized Next.js animations.',
  alternates: {
    canonical: '/projects/launchkit',
  },
  openGraph: {
    title: 'LaunchKit Case Study',
    description:
      'A legal document generator built with Next.js, TypeScript, Framer Motion, and Tailwind CSS.',
    url: '/projects/launchkit',
    type: 'article',
  },
}

export default function LaunchKitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
