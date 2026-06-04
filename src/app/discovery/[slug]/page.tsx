import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DiscoveryBriefClient } from '@/components/discovery/discovery-brief-client'
import { getDiscoveryBrief, getDiscoveryBriefSlugs } from '@/lib/discovery-briefs'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getDiscoveryBriefSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const brief = getDiscoveryBrief(slug)

  if (!brief) {
    return {
      title: 'Discovery Brief | Highbee',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: brief.metadataTitle,
    description: brief.metadataDescription,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    alternates: {
      canonical: `/discovery/${brief.slug}`,
    },
    openGraph: {
      title: brief.metadataTitle,
      description: brief.metadataDescription,
      url: `/discovery/${brief.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: brief.metadataTitle,
      description: brief.metadataDescription,
    },
  }
}

export default async function DiscoveryBriefPage({ params }: PageProps) {
  const { slug } = await params
  const brief = getDiscoveryBrief(slug)

  if (!brief) {
    notFound()
  }

  return <DiscoveryBriefClient brief={brief} />
}
