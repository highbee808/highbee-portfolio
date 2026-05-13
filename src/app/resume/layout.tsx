import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume for Ibrahim Lawal, a full-stack developer and AI integration specialist building Next.js, TypeScript, Supabase, and Claude AI applications.',
  alternates: {
    canonical: '/resume',
  },
  openGraph: {
    title: 'Ibrahim Lawal Resume',
    description:
      'Full-stack developer and AI integration specialist focused on Next.js, TypeScript, Supabase, and Claude AI.',
    url: '/resume',
    type: 'profile',
  },
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
