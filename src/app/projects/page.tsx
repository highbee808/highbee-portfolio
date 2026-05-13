import type { Metadata } from 'next'
import ProjectsClient from './projects-client'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore AI-powered products, full-stack web apps, and case studies built by Ibrahim Lawal, including TaskRite, LaunchKit, Upvotely, and RentRight.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects by Highbee',
    description:
      'AI-powered products, full-stack web apps, and case studies built by Ibrahim Lawal.',
    url: '/projects',
    type: 'website',
  },
}

export default function ProjectsPage() {
  return <ProjectsClient />
}
