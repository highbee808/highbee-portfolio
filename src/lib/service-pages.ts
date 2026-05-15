import { absoluteUrl } from '@/lib/seo'

export type ServicePage = {
  slug: string
  title: string
  shortTitle: string
  metaTitle: string
  description: string
  eyebrow: string
  hero: string
  intro: string
  price: string
  timeline: string
  audience: string
  outcomes: string[]
  process: { title: string; description: string }[]
  proof: { metric: string; label: string }[]
  faqs: { question: string; answer: string }[]
  related: string[]
}

export const servicePages: ServicePage[] = [
  {
    slug: 'ai-integration',
    title: 'AI Integration Services',
    shortTitle: 'AI Integration',
    metaTitle: 'AI Integration Services',
    description:
      'AI integration services for founders and small businesses that need chatbots, workflow automation, content tools, and practical AI features built into existing products.',
    eyebrow: 'AI integration services',
    hero: 'Add useful AI features to the product you already have.',
    intro:
      'I help founders and small teams turn vague AI ideas into production-ready features: chat assistants, document automation, internal tools, customer support flows, and AI-assisted workflows that actually fit the business.',
    price: 'Starting at $500',
    timeline: 'Typical delivery: 1-3 weeks',
    audience:
      'Best for teams that already have a product, website, or manual workflow and want AI to reduce repetitive work or improve customer experience.',
    outcomes: [
      'Custom AI assistants trained around your offer, product, or support content',
      'Workflow automation that connects forms, databases, email, and AI responses',
      'Prompt design, guardrails, API integration, and production deployment',
      'Clear handoff documentation so your team understands what was built',
    ],
    process: [
      {
        title: 'Scope the workflow',
        description:
          'We identify the exact job AI should perform, what data it needs, where humans stay in control, and what success looks like.',
      },
      {
        title: 'Build the integration',
        description:
          'I wire the AI model into your app, database, forms, or dashboard with sensible error states and limits.',
      },
      {
        title: 'Test with real examples',
        description:
          'We run realistic prompts, edge cases, and user flows before shipping so the feature feels dependable.',
      },
    ],
    proof: [
      { metric: '9', label: 'AI agents in TaskRite' },
      { metric: '3+', label: 'AI-powered products shipped' },
      { metric: '100%', label: 'TypeScript delivery' },
    ],
    faqs: [
      {
        question: 'Can you add AI to an existing website or SaaS app?',
        answer:
          'Yes. I can integrate AI into an existing Next.js, React, or API-backed product, including chat widgets, content generation, summaries, and workflow automation.',
      },
      {
        question: 'Which AI providers do you work with?',
        answer:
          'I work with Claude, OpenAI, and provider-agnostic API patterns so the feature can evolve as model pricing and quality change.',
      },
      {
        question: 'Do you help with prompts and safety rules?',
        answer:
          'Yes. The implementation includes prompt structure, response constraints, fallback behavior, and practical checks for the user flow.',
      },
    ],
    related: ['claude-ai-integration', 'mvp-development', 'nextjs-developer-nigeria'],
  },
  {
    slug: 'claude-ai-integration',
    title: 'Claude AI Integration Services',
    shortTitle: 'Claude AI',
    metaTitle: 'Claude AI Integration Services',
    description:
      'Claude AI integration for apps, chat widgets, internal tools, and automation workflows using Anthropic APIs, Next.js, TypeScript, and production-ready prompts.',
    eyebrow: 'Claude AI integration',
    hero: 'Build Claude-powered features with practical product guardrails.',
    intro:
      'Claude is strong for reasoning-heavy workflows, long-context conversations, and helpful product assistants. I build Claude integrations that are scoped, testable, and tied to a real business outcome instead of a demo prompt.',
    price: 'Starting at $500',
    timeline: 'Typical delivery: 1-2 weeks',
    audience:
      'Best for founders who want a Claude-powered assistant, document workflow, analysis tool, or customer-facing chat experience.',
    outcomes: [
      'Claude API integration with clean server-side request handling',
      'System prompts, context injection, and response formatting tuned for your use case',
      'Streaming chat, tool-style workflows, and data-aware assistants where appropriate',
      'Usage-aware implementation that keeps token cost and latency in view',
    ],
    process: [
      {
        title: 'Define the assistant role',
        description:
          'We turn the job-to-be-done into a clear Claude instruction set with boundaries, examples, and success criteria.',
      },
      {
        title: 'Connect app context',
        description:
          'I connect Claude to the right user inputs, product data, files, or database records without overexposing sensitive data.',
      },
      {
        title: 'Ship and tune',
        description:
          'We test real conversations, adjust the prompt and UI, then deploy the feature with logging and graceful failure states.',
      },
    ],
    proof: [
      { metric: 'Claude', label: 'API implementation' },
      { metric: 'Chat', label: 'Portfolio assistant shipped' },
      { metric: 'Next.js', label: 'Production app stack' },
    ],
    faqs: [
      {
        question: 'Can Claude answer questions about my business or product?',
        answer:
          'Yes. I can build a context-aware assistant that answers from your content, product details, FAQs, or structured data.',
      },
      {
        question: 'Can you build streaming chat with Claude?',
        answer:
          'Yes. I can implement streaming responses in a Next.js app so the assistant feels fast and conversational.',
      },
      {
        question: 'How do you control Claude API costs?',
        answer:
          'I scope context carefully, keep prompts lean, add token limits, and design the workflow so expensive calls only happen when useful.',
      },
    ],
    related: ['ai-integration', 'mvp-development', 'nextjs-developer-nigeria'],
  },
  {
    slug: 'nextjs-developer-nigeria',
    title: 'Next.js Developer in Nigeria',
    shortTitle: 'Next.js Developer',
    metaTitle: 'Next.js Developer in Nigeria',
    description:
      'Hire a Next.js developer in Nigeria for full-stack web apps, dashboards, landing pages, AI features, Supabase backends, and Vercel deployments.',
    eyebrow: 'Next.js developer Nigeria',
    hero: 'Full-stack Next.js development for teams that need to ship.',
    intro:
      'I build fast, polished web applications with Next.js, TypeScript, Supabase, Tailwind CSS, and Vercel. The focus is simple: clean product experiences, reliable backend flows, and launch-ready delivery.',
    price: 'Starting at $1,000',
    timeline: 'Typical delivery: 2-6 weeks',
    audience:
      'Best for founders, startups, and businesses in Nigeria or abroad that need a full-stack web app built by one accountable developer.',
    outcomes: [
      'Next.js App Router applications with responsive, production-ready UI',
      'Supabase database design, authentication, API routes, and admin flows',
      'Vercel deployment, environment setup, and performance-minded implementation',
      'Reusable TypeScript components and practical project documentation',
    ],
    process: [
      {
        title: 'Map the product',
        description:
          'We define the core screens, data model, user roles, and must-have workflows before writing code.',
      },
      {
        title: 'Build the core app',
        description:
          'I implement the frontend, backend, database, and deployment path in focused milestones.',
      },
      {
        title: 'Launch and refine',
        description:
          'We test the important flows, clean up edge cases, and get the app live on Vercel.',
      },
    ],
    proof: [
      { metric: '5+', label: 'Live projects' },
      { metric: '27', label: 'TaskRite database migrations' },
      { metric: '50+', label: 'TaskRite components' },
    ],
    faqs: [
      {
        question: 'Do you work with clients outside Nigeria?',
        answer:
          'Yes. I work remotely with founders and small teams anywhere, while being based in Lagos, Nigeria.',
      },
      {
        question: 'Can you build both frontend and backend?',
        answer:
          'Yes. I handle full-stack Next.js work, including UI, API routes, Supabase, authentication, and deployment.',
      },
      {
        question: 'Can you improve an existing Next.js app?',
        answer:
          'Yes. I can audit, refactor, add features, improve SEO, and fix performance or deployment issues in an existing codebase.',
      },
    ],
    related: ['mvp-development', 'ai-integration', 'claude-ai-integration'],
  },
  {
    slug: 'mvp-development',
    title: 'MVP Development Services',
    shortTitle: 'MVP Development',
    metaTitle: 'MVP Development Services',
    description:
      'MVP development services for founders who need a focused, launch-ready web app or prototype built with Next.js, TypeScript, Supabase, and Vercel.',
    eyebrow: 'MVP development services',
    hero: 'Turn a product idea into a focused MVP people can actually use.',
    intro:
      'I help founders move from idea to working product without months of planning. The goal is a tight first version with the right screens, data model, user flow, and launch path.',
    price: 'Starting at $1,500',
    timeline: 'Typical delivery: 2-4 weeks',
    audience:
      'Best for founders who need a real product prototype, investor demo, internal tool, or first customer-facing version.',
    outcomes: [
      'MVP scope shaped around the smallest useful product, not a bloated feature list',
      'Clickable, responsive product UI built with real implementation constraints',
      'Database, authentication, payments, AI, or admin features where they matter',
      'Deployment to Vercel with a roadmap for the next iteration',
    ],
    process: [
      {
        title: 'Focus the first version',
        description:
          'We narrow the idea to the user, problem, core workflow, and launch goal that matter most.',
      },
      {
        title: 'Build launchable foundations',
        description:
          'I create the app structure, core screens, backend, and integrations needed for a credible first release.',
      },
      {
        title: 'Prepare for feedback',
        description:
          'We ship with enough polish to learn from real users, then identify what to improve next.',
      },
    ],
    proof: [
      { metric: '2-4', label: 'Week prototype window' },
      { metric: '100%', label: 'Launch-focused scope' },
      { metric: 'Vercel', label: 'Deployment included' },
    ],
    faqs: [
      {
        question: 'How much can fit into a 2-4 week MVP?',
        answer:
          'Enough to validate the core workflow: the main screens, backend flow, and one or two differentiating features. I keep scope tight so the product can ship.',
      },
      {
        question: 'Can the MVP include AI features?',
        answer:
          'Yes. AI can be part of the MVP when it supports the core user value, such as chat, generation, summarization, or automation.',
      },
      {
        question: 'Do I need finished designs before we start?',
        answer:
          'No. I can work from a product brief, rough sketches, examples, or a call. If designs already exist, I can build from them.',
      },
    ],
    related: ['nextjs-developer-nigeria', 'ai-integration', 'claude-ai-integration'],
  },
]

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((service) => service.slug === slug)
}

export function getRelatedServices(service: ServicePage): ServicePage[] {
  return service.related
    .map((slug) => getServicePage(slug))
    .filter((related): related is ServicePage => Boolean(related))
}

export function serviceUrl(service: ServicePage): string {
  return absoluteUrl(`/services/${service.slug}`)
}
