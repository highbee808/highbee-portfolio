import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RentRight Case Study',
  description:
    'RentRight is a property rental marketplace for Nigeria with digital receipts, rent tracking, secure messaging, and PWA support.',
  alternates: {
    canonical: '/projects/rentright',
  },
  openGraph: {
    title: 'RentRight Case Study',
    description:
      'A property rental marketplace for Nigeria built with Next.js, Supabase, Paystack, and PWA support.',
    url: '/projects/rentright',
    type: 'article',
  },
}

export default function RentRightLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
