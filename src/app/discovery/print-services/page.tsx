import type { Metadata } from 'next'
import { PrintServicesDiscoveryClient } from './print-services-discovery-client'

export const metadata: Metadata = {
  title: 'Print & Branding Website Discovery Brief',
  description:
    'A Highbee discovery brief for planning a local print and branding website with product ordering and social media support.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: '/discovery/print-services',
  },
  openGraph: {
    title: 'Print & Branding Website Discovery Brief',
    description:
      'A simple discovery page to gather the context needed for a print and branding website project.',
    url: '/discovery/print-services',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Print & Branding Website Discovery Brief',
    description:
      'A simple Highbee discovery page for planning a print and branding website project.',
  },
}

export default function PrintServicesDiscoveryPage() {
  return <PrintServicesDiscoveryClient />
}
