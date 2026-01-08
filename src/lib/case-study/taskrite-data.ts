export const taskRiteData = {
  title: 'TaskRite',
  tagline: 'AI-Powered Task Management',
  description: 'Transform complex goals into actionable steps through intelligent conversation.',
  extendedDescription: 'TaskRite combines advanced AI agents with intuitive task management. Instead of glorified lists, it helps users figure out HOW to accomplish complex goals through multi-phase conversations with 9 specialized AI agents.',
  url: 'https://trytaskrite.com',
  caseStudyUrl: '/projects/taskrite',

  metrics: [
    { value: '27', label: 'DB Migrations', description: 'Mature, evolving schema' },
    { value: '9', label: 'AI Agents', description: 'Specialized coaching' },
    { value: '50+', label: 'Components', description: 'Reusable React components' },
    { value: '100%', label: 'TypeScript', description: 'Full type safety' },
  ],

  highlights: [
    { value: '60%', label: 'Cost Reduction', description: 'Through smart caching' },
  ],

  techStack: [
    { name: 'Next.js 15', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Claude AI', category: 'AI Engine' },
    { name: 'Supabase', category: 'Backend' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Framer Motion', category: 'Animation' },
  ],

  features: [
    {
      title: 'AI Task Breakdown',
      description: 'Intelligent decomposition of complex goals into actionable subtasks.',
    },
    {
      title: 'Multi-Phase Conversations',
      description: 'Guided conversations that adapt based on task type and context.',
    },
    {
      title: 'Goal Tracking',
      description: 'Visual progress tracking with milestone celebrations.',
    },
    {
      title: '9 Specialized Agents',
      description: 'Different AI personas for planning, motivation, and coaching.',
    },
    {
      title: 'Context Awareness',
      description: 'Remembers conversations and adapts recommendations.',
    },
    {
      title: 'Smart Suggestions',
      description: 'Proactive task suggestions based on patterns.',
    },
  ],

  challenges: [
    {
      challenge: 'Managing Complex AI Conversation State',
      solution: 'Implemented multi-phase conversation system with state machines for seamless context switching.',
    },
    {
      challenge: 'Real-time Updates Across Components',
      solution: 'Built custom subscription system using Supabase realtime with React context.',
    },
    {
      challenge: 'Scaling AI Costs',
      solution: 'Designed tiered caching strategy, reducing API calls by 60% while maintaining quality.',
    },
  ],

  architecture: {
    frontend: [
      'Next.js 15 App Router',
      'Server & Client Components',
      'Framer Motion Animations',
      'Real-time UI Updates',
    ],
    ai: [
      'Claude AI Integration',
      '9 Specialized Agents',
      'Multi-phase Conversations',
      'Response Caching',
    ],
    backend: [
      'Supabase PostgreSQL',
      'Row Level Security',
      'Edge Functions',
      'Real-time Subscriptions',
    ],
  },

  problem: "Traditional task managers are glorified lists. They don't help you figure out HOW to accomplish complex goals.",

  solution: "TaskRite uses AI to have intelligent conversations that break down your complex goals into actionable steps, with specialized agents that coach you through execution.",

  learnings: [
    'Multi-phase conversation design is crucial',
    'Early DB architecture investment pays off',
    'Specialized agents outperform generic ones',
  ],

  author: {
    name: 'Ibrahim Lawal',
    title: 'Full-Stack Developer',
    initials: 'IL',
    website: 'highbee.dev',
    email: 'hello@highbee.dev',
  },
}

export const slideDimensions = {
  linkedInCarousel: { width: 1080, height: 1350 },
  linkedInPost: { width: 1080, height: 1080 },
  linkedInArticle: { width: 1200, height: 627 },
  twitter: { width: 1200, height: 675 },
  ogDefault: { width: 1200, height: 630 },
}

export const slideContent = [
  {
    id: '1',
    title: 'Cover',
    type: 'cover',
  },
  {
    id: '2',
    title: 'The Problem',
    type: 'problem',
  },
  {
    id: '3',
    title: 'The Solution',
    type: 'solution',
  },
  {
    id: '4',
    title: 'Key Features',
    type: 'features',
  },
  {
    id: '5',
    title: 'Tech Stack',
    type: 'tech-stack',
  },
  {
    id: '6',
    title: 'Architecture',
    type: 'architecture',
  },
  {
    id: '7',
    title: 'Challenges',
    type: 'challenges',
  },
  {
    id: '8',
    title: 'Results',
    type: 'results',
  },
  {
    id: '9',
    title: 'Get Started',
    type: 'cta',
  },
]
