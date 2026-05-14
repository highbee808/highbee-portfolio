import type { Metadata } from 'next'
import TaskRiteCaseStudy from './taskrite-client'

export const metadata: Metadata = {
  title: 'TaskRite Case Study',
  description:
    'TaskRite is an AI-powered task management platform with 9 specialized agents, goal breakdowns, progress tracking, and a full Next.js/Supabase architecture.',
  alternates: {
    canonical: '/projects/taskrite',
  },
  openGraph: {
    title: 'TaskRite Case Study',
    description:
      'An AI-powered task management platform built with Next.js, TypeScript, Claude AI, Supabase, and Tailwind CSS.',
    url: '/projects/taskrite',
    type: 'article',
  },
}

export default function TaskRitePage() {
  return <TaskRiteCaseStudy />
}
