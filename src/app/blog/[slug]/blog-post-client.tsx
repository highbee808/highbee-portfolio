'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Clock, Twitter, Linkedin, Link as LinkIcon, Copy, Check, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import type { BlogPost } from '@/lib/blog-store'

interface BlogPostClientProps {
  post: BlogPost
  isPreview?: boolean
}

const categoryColors: Record<string, string> = {
  ai: 'bg-red-500/15 text-red-400 border-red-500/30',
  typescript: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  design: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  general: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
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
        {language || 'code'}
      </div>

      {/* Copy button */}
      <button
        onClick={copyCode}
        className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 border border-white/10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white/10"
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

// Parse and render markdown content
function MarkdownContent({ content }: { content: string }) {
  // Split content into blocks
  const blocks = content.split('\n\n')

  return (
    <div className="blog-content">
      {blocks.map((block, index) => {
        const trimmed = block.trim()
        if (!trimmed) return null

        // Heading 2
        if (trimmed.startsWith('## ')) {
          const text = trimmed.slice(3)
          return (
            <h2 key={index} className="font-serif text-2xl md:text-3xl text-white mt-12 mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
              {text}
            </h2>
          )
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          const text = trimmed.slice(4)
          return (
            <h3 key={index} className="font-serif text-xl text-white mt-8 mb-4">
              {text}
            </h3>
          )
        }

        // Code block
        if (trimmed.startsWith('```')) {
          const lines = trimmed.split('\n')
          const language = lines[0].slice(3).trim()
          const code = lines.slice(1, -1).join('\n')
          return <CodeBlock key={index} language={language} code={code} />
        }

        // Blockquote
        if (trimmed.startsWith('> ')) {
          const text = trimmed.slice(2)
          return (
            <blockquote key={index} className="my-8 pl-6 border-l-2 border-red-500/50 italic text-white/60">
              <p className="text-lg leading-relaxed">{text}</p>
            </blockquote>
          )
        }

        // Unordered list
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter(line => line.startsWith('- '))
          return (
            <ul key={index} className="my-6 space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70">
                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5" />
                  <span dangerouslySetInnerHTML={{
                    __html: formatInlineMarkdown(item.slice(2))
                  }} />
                </li>
              ))}
            </ul>
          )
        }

        // Ordered list
        if (/^\d+\. /.test(trimmed)) {
          const items = trimmed.split('\n').filter(line => /^\d+\. /.test(line))
          return (
            <ol key={index} className="my-6 space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-sm flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <span dangerouslySetInnerHTML={{
                    __html: formatInlineMarkdown(item.replace(/^\d+\. /, ''))
                  }} />
                </li>
              ))}
            </ol>
          )
        }

        // YouTube video embed (HTML from generator)
        if (trimmed.includes('<div class="video-embed"')) {
          const videoIdMatch = trimmed.match(/data-video-id="([^"]+)"/)
          const videoId = videoIdMatch ? videoIdMatch[1] : null

          if (videoId) {
            return (
              <div key={index} className="my-8">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="Video"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )
          }
        }

        // Inline image (markdown syntax: ![alt](url))
        if (trimmed.startsWith('![') && trimmed.includes('](')) {
          const imageMatch = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\)/)
          if (imageMatch) {
            const alt = imageMatch[1]
            const src = imageMatch[2]
            return (
              <figure key={index} className="my-8">
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                  <Image
                    src={src}
                    alt={alt || 'Blog image'}
                    fill
                    className="object-cover"
                    unoptimized={src.startsWith('http')}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                </div>
                {alt && (
                  <figcaption className="text-center text-sm text-white/40 mt-3 italic">
                    {alt}
                  </figcaption>
                )}
              </figure>
            )
          }
        }

        // Regular paragraph
        return (
          <p key={index} className="text-white/70 leading-relaxed mb-6" dangerouslySetInnerHTML={{
            __html: formatInlineMarkdown(trimmed)
          }} />
        )
      })}
    </div>
  )
}

// Format inline markdown (bold, italic, code, links)
function formatInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/5 text-red-400 text-sm font-mono">$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-red-400 hover:text-red-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer">$1</a>')
}

export default function BlogPostClient({ post, isPreview }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false)

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

      {/* Preview Banner */}
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500/90 text-black py-2 px-4 text-center text-sm font-medium">
          <AlertTriangle className="w-4 h-4 inline mr-2" />
          Preview Mode - This post is not published yet
        </div>
      )}

      {/* Header */}
      <nav className={`relative z-10 px-6 py-4 ${isPreview ? 'mt-10' : ''}`}>
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
                categoryColors[post.categoryColor] || categoryColors.general
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
                  unoptimized={post.coverImage.startsWith('http')}
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

          {/* Content - Render markdown */}
          <MarkdownContent content={post.content} />

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
