'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, Link as LinkIcon, Copy, Check } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'

interface BlogPost {
  title: string
  excerpt: string
  category: string
  categoryColor: string
  date: string
  readTime: string
  coverImage?: string
  content: ContentBlock[]
}

type ContentBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'blockquote'; text: string }
  | { type: 'divider' }

// Blog posts with structured content
const blogPosts: Record<string, BlogPost> = {
  'building-ai-apps-with-claude': {
    title: 'Building AI-Powered Apps with Claude: A Developer\'s Guide',
    excerpt: 'Learn how to integrate Claude AI into your Next.js applications with practical examples and best practices.',
    category: 'AI Development',
    categoryColor: 'ai',
    date: 'Jan 5, 2025',
    readTime: '8 min read',
    coverImage: '/images/blog/ai-apps-cover.jpg',
    content: [
      { type: 'heading', level: 2, text: 'Introduction' },
      { type: 'paragraph', text: 'Building AI-powered applications has never been more accessible. With Claude\'s powerful API, developers can create intelligent, conversational experiences that feel natural and helpful.' },
      { type: 'paragraph', text: 'In this guide, we\'ll walk through the complete process of integrating Claude into a Next.js application, from initial setup to production deployment.' },

      { type: 'image', src: '/images/blog/claude-architecture.jpg', alt: 'Claude API Architecture', caption: 'High-level architecture of a Claude-powered application' },

      { type: 'heading', level: 2, text: 'Getting Started' },
      { type: 'paragraph', text: 'First, you\'ll need to set up your project with the Anthropic SDK:' },
      { type: 'code', language: 'bash', code: 'npm install @anthropic-ai/sdk' },
      { type: 'paragraph', text: 'Then, initialize the client in your application:' },
      { type: 'code', language: 'typescript', code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});` },

      { type: 'heading', level: 2, text: 'Building a Chat Interface' },
      { type: 'paragraph', text: 'The key to a great AI chat experience is streaming responses. Here\'s how to implement it:' },
      { type: 'code', language: 'typescript', code: `const response = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  stream: true,
  messages: [{ role: 'user', content: userMessage }],
});` },

      { type: 'heading', level: 2, text: 'Best Practices' },
      { type: 'list', ordered: true, items: [
        '**System Prompts**: Define clear system prompts that give Claude context about its role',
        '**Error Handling**: Always implement proper error handling for API calls',
        '**Rate Limiting**: Respect API rate limits and implement backoff strategies',
        '**User Experience**: Show typing indicators and stream responses for better UX',
      ]},

      { type: 'blockquote', text: 'The best AI experiences feel like magic because they anticipate user needs while remaining transparent about their limitations.' },

      { type: 'heading', level: 2, text: 'Conclusion' },
      { type: 'paragraph', text: 'Claude\'s API makes it straightforward to add powerful AI capabilities to your applications. Start small, iterate, and always prioritize the user experience.' },
    ],
  },
  'rest-to-trpc': {
    title: 'Why I Switched from REST to tRPC',
    excerpt: 'Explore the benefits of type-safe APIs and how tRPC can improve your development workflow.',
    category: 'TypeScript',
    categoryColor: 'typescript',
    date: 'Dec 28, 2024',
    readTime: '5 min read',
    coverImage: '/images/blog/trpc-cover.jpg',
    content: [
      { type: 'heading', level: 2, text: 'The Problem with REST' },
      { type: 'paragraph', text: 'REST APIs have served us well, but they come with challenges in TypeScript projects:' },
      { type: 'list', ordered: false, items: [
        'Manual type definitions for request/response',
        'No compile-time validation',
        'Boilerplate for API calls',
        'Easy to have frontend/backend type drift',
      ]},

      { type: 'heading', level: 2, text: 'Enter tRPC' },
      { type: 'paragraph', text: 'tRPC solves these problems by providing end-to-end type safety without code generation. Your types flow automatically from your backend to your frontend.' },

      { type: 'code', language: 'typescript', code: `// Backend: Define your router
const appRouter = router({
  user: router({
    get: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ input }) => {
        return getUserById(input.id);
      }),
  }),
});

// Frontend: Full type safety!
const user = trpc.user.get.useQuery({ id: '123' });` },

      { type: 'heading', level: 2, text: 'Key Benefits' },
      { type: 'list', ordered: true, items: [
        '**Full Type Safety**: Your API types flow from backend to frontend automatically',
        '**No Code Generation**: Unlike GraphQL, tRPC doesn\'t require generating types',
        '**Excellent DX**: Autocomplete works across your entire stack',
      ]},

      { type: 'heading', level: 2, text: 'Conclusion' },
      { type: 'paragraph', text: 'If you\'re building a full-stack TypeScript application, tRPC is worth considering for its developer experience benefits.' },
    ],
  },
  'bento-grid-layouts': {
    title: 'Designing Bento Grid Layouts That Convert',
    excerpt: 'A deep dive into creating Apple-style Bento grid layouts for modern web applications.',
    category: 'Design',
    categoryColor: 'design',
    date: 'Dec 15, 2024',
    readTime: '6 min read',
    coverImage: '/images/blog/bento-cover.jpg',
    content: [
      { type: 'heading', level: 2, text: 'What is a Bento Grid?' },
      { type: 'paragraph', text: 'Bento grids, popularized by Apple, are modular layouts with cards of varying sizes that create visual interest and hierarchy. Named after Japanese bento boxes, they organize content into distinct, visually balanced sections.' },

      { type: 'image', src: '/images/blog/bento-example.jpg', alt: 'Bento Grid Example', caption: 'Example of a well-designed Bento grid layout' },

      { type: 'heading', level: 2, text: 'Key Principles' },
      { type: 'list', ordered: true, items: [
        '**Visual Hierarchy**: Larger cards draw attention first',
        '**Consistent Spacing**: Use uniform gaps between cards',
        '**Responsive Design**: Cards should reflow gracefully on smaller screens',
      ]},

      { type: 'heading', level: 2, text: 'Implementation Tips' },
      { type: 'paragraph', text: 'Use CSS Grid for the foundation:' },
      { type: 'code', language: 'css', code: `.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
}

.card-large {
  grid-column: span 8;
  grid-row: span 2;
}

.card-small {
  grid-column: span 4;
}` },

      { type: 'heading', level: 2, text: 'Conclusion' },
      { type: 'paragraph', text: 'Bento grids create engaging, modern layouts when used thoughtfully. Focus on content hierarchy and responsive behavior for the best results.' },
    ],
  },
}

const categoryColors: Record<string, string> = {
  ai: 'bg-red-500/15 text-red-400 border-red-500/30',
  typescript: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  design: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
}

// Code block component with copy functionality
function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6">
      {/* Language badge */}
      <div className="absolute top-0 left-4 -translate-y-1/2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-white/60 font-mono">
        {language}
      </div>

      {/* Copy button */}
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-white/60" />
        )}
      </button>

      {/* Code content */}
      <pre className="pt-8 pb-4 px-4 rounded-2xl bg-[#0d0d12] border border-white/10 overflow-x-auto">
        <code className="text-sm font-mono text-white/80 leading-relaxed">
          {code}
        </code>
      </pre>
    </div>
  )
}

// Content renderer
function renderContent(block: ContentBlock, index: number) {
  switch (block.type) {
    case 'heading':
      if (block.level === 2) {
        return (
          <h2 key={index} className="font-serif text-2xl md:text-3xl text-white mt-12 mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
            {block.text}
          </h2>
        )
      }
      return (
        <h3 key={index} className="font-serif text-xl text-white mt-8 mb-4">
          {block.text}
        </h3>
      )

    case 'paragraph':
      return (
        <p key={index} className="text-white/70 leading-relaxed mb-6" dangerouslySetInnerHTML={{
          __html: block.text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/5 text-red-400 text-sm font-mono">$1</code>')
        }} />
      )

    case 'image':
      return (
        <figure key={index} className="my-10">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback for missing images
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement!.innerHTML = `
                  <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-600/20 to-zinc-800/20">
                    <span class="text-white/40 text-sm">Image: ${block.alt}</span>
                  </div>
                `
              }}
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-white/40">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'code':
      return <CodeBlock key={index} language={block.language} code={block.code} />

    case 'list':
      const ListTag = block.ordered ? 'ol' : 'ul'
      return (
        <ListTag key={index} className={`my-6 space-y-3 ${block.ordered ? 'list-none counter-reset-item' : ''}`}>
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-white/70">
              {block.ordered ? (
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-sm flex items-center justify-center font-medium">
                  {i + 1}
                </span>
              ) : (
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5" />
              )}
              <span dangerouslySetInnerHTML={{
                __html: item
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em>$1</em>')
              }} />
            </li>
          ))}
        </ListTag>
      )

    case 'blockquote':
      return (
        <blockquote key={index} className="my-8 pl-6 border-l-2 border-red-500/50 italic text-white/60">
          <p className="text-lg leading-relaxed">{block.text}</p>
        </blockquote>
      )

    case 'divider':
      return (
        <div key={index} className="my-12 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
      )

    default:
      return null
  }
}

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogPosts[slug]
  const [copied, setCopied] = useState(false)

  if (!post) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">Post not found</h1>
          <Link href="/blog" className="text-red-500 hover:text-red-400">
            Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[80px]" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.06] blur-[80px]" />
      </div>

      {/* Header */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Blog</span>
          </Link>
          <Link href="/" className="hidden md:flex items-center gap-3 text-white/60 hover:text-white transition-colors">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-red-500/50">
              <Image
                src="/images/profile-cartoon.png"
                alt="Ibrahim Lawal"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-medium">Ibrahim Lawal</span>
          </Link>
        </div>
      </nav>

      {/* Article */}
      <article className="relative z-10 px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <header className="mb-10">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border w-fit mb-6 ${
                categoryColors[post.categoryColor]
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current" />
              {post.category}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-white/60 mb-8">
              {post.excerpt}
            </p>

            {/* Meta info */}
            <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-white/10">
              <div className="flex items-center gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-white/40 mr-2">Share:</span>
                <button
                  onClick={shareOnTwitter}
                  className="p-2 rounded-lg bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4 text-white/60" />
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="p-2 rounded-lg bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white/60" />
                </button>
                <button
                  onClick={copyLink}
                  className="p-2 rounded-lg bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
                  title="Copy link"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <LinkIcon className="w-4 h-4 text-white/60" />
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <figure className="mb-12">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = `
                      <div class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-600/20 to-zinc-800/20">
                        <span class="text-white/40 text-sm">Cover Image</span>
                      </div>
                    `
                  }}
                />
              </div>
            </figure>
          )}

          {/* Content */}
          <div className="blog-content">
            {post.content.map((block, index) => renderContent(block, index))}
          </div>

          {/* Author Card */}
          <div className="mt-16 p-6 glass rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-500/50 flex-shrink-0">
                <Image
                  src="/images/profile-cartoon.png"
                  alt="Ibrahim Lawal"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Ibrahim Lawal</h3>
                <p className="text-sm text-white/50 mb-3">
                  Full-Stack Developer & AI Integration Specialist. Building AI-powered products that solve real problems.
                </p>
                <Link
                  href="/"
                  className="text-sm text-red-500 hover:text-red-400 transition-colors inline-flex items-center gap-1"
                >
                  View Portfolio
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </Link>
              </div>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </div>
        </motion.div>
      </article>
    </main>
  )
}
