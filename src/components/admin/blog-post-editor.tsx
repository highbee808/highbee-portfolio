'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Save,
  Eye,
  LogOut,
  Home,
  Image as ImageIcon,
  Bold,
  Italic,
  Code,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Link as LinkIcon,
  Wand2,
  Loader2,
  CheckCircle,
} from 'lucide-react'
import type { BlogPost } from '@/lib/blog-store'

interface BlogPostEditorProps {
  post?: BlogPost
}

const categories: { value: 'ai' | 'typescript' | 'design' | 'general'; label: string }[] = [
  { value: 'ai', label: 'AI Development' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'design', label: 'Design' },
  { value: 'general', label: 'General' },
]

export function BlogPostEditor({ post }: BlogPostEditorProps) {
  const router = useRouter()
  const isEditing = !!post

  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [excerpt, setExcerpt] = useState(post?.excerpt || '')
  const [category, setCategory] = useState(post?.categoryColor || 'general')
  const [content, setContent] = useState(post?.content || '')
  const [coverImage, setCoverImage] = useState(post?.coverImage || '')
  const [published, setPublished] = useState(post?.published || false)
  const [featuredOnHomepage, setFeaturedOnHomepage] = useState(post?.featuredOnHomepage || false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [isFixingFormat, setIsFixingFormat] = useState(false)
  const [formatMessage, setFormatMessage] = useState('')

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!isEditing || !post?.slug) {
      setSlug(generateSlug(value))
    }
  }

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newContent =
      content.substring(0, start) +
      before +
      selectedText +
      after +
      content.substring(end)

    setContent(newContent)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      )
    }, 0)
  }

  const handleFixFormatting = async () => {
    if (!content.trim() || isFixingFormat) return

    setIsFixingFormat(true)
    setFormatMessage('')
    setError('')

    try {
      const res = await fetch('/api/admin/blog/format', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      })

      if (!res.ok) {
        throw new Error('Failed to check formatting')
      }

      const data = await res.json()

      if (data.wasModified) {
        setContent(data.fixedContent)
        const issueCount = data.issuesFound.length
        setFormatMessage(`Fixed ${issueCount} issue${issueCount > 1 ? 's' : ''}: ${data.issuesFound.slice(0, 3).join(', ')}${issueCount > 3 ? '...' : ''}`)
      } else {
        setFormatMessage('No formatting issues found!')
      }

      // Clear message after 5 seconds
      setTimeout(() => setFormatMessage(''), 5000)
    } catch (err) {
      setError('Failed to check formatting')
    } finally {
      setIsFixingFormat(false)
    }
  }

  const handleSave = async (asDraft = false) => {
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    setSaving(true)
    setError('')

    try {
      const categoryLabel = categories.find(c => c.value === category)?.label || 'General'

      const payload = {
        title,
        slug,
        excerpt,
        category: categoryLabel,
        categoryColor: category,
        content,
        coverImage: coverImage || undefined,
        published: !asDraft,
        featuredOnHomepage,
        date: post?.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: estimateReadTime(content),
      }

      const url = isEditing ? `/api/admin/blog/${post.id}` : '/api/admin/blog'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin/blog')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to save post')
      }
    } catch {
      setError('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-600/5 blur-[80px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blog"
              className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-white">
                {isEditing ? 'Edit Post' : 'New Post'}
              </h1>
              <p className="text-xs text-white/40">
                {isEditing ? `Editing: ${post.title}` : 'Create a new blog post'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {slug && (
              <Link
                href={`/blog/${slug}?preview=true`}
                target="_blank"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors text-sm"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Link>
            )}
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 disabled:opacity-50 transition-colors text-sm"
            >
              Save Draft
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-medium hover:from-red-500 hover:to-red-600 disabled:opacity-50 transition-all text-sm"
            >
              <Save className="w-4 h-4" />
              {published ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Editor */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Post title..."
                  className="w-full px-0 py-2 text-3xl font-bold bg-transparent border-0 border-b border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-red-500/50"
                />
              </div>

              {/* Content Editor */}
              <div className="glass rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-1 p-3 border-b border-white/10">
                  <button
                    onClick={() => insertMarkdown('## ', '')}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Heading"
                  >
                    <Heading2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('**', '**')}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Bold"
                  >
                    <Bold className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('*', '*')}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Italic"
                  >
                    <Italic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('`', '`')}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Inline Code"
                  >
                    <Code className="w-4 h-4" />
                  </button>
                  <div className="w-px h-5 bg-white/10 mx-1" />
                  <button
                    onClick={() => insertMarkdown('- ')}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Bullet List"
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('1. ')}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Numbered List"
                  >
                    <ListOrdered className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('> ')}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Quote"
                  >
                    <Quote className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('[', '](url)')}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Link"
                  >
                    <LinkIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => insertMarkdown('![alt](', ')')}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Image"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                  <div className="w-px h-5 bg-white/10 mx-1" />
                  <button
                    onClick={() => insertMarkdown('\n```\n', '\n```\n')}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors text-xs font-mono"
                    title="Code Block"
                  >
                    {'</>'}
                  </button>
                  <div className="w-px h-5 bg-white/10 mx-1" />
                  <button
                    onClick={handleFixFormatting}
                    disabled={isFixingFormat || !content.trim()}
                    className="p-2 rounded-lg hover:bg-purple-500/20 text-white/60 hover:text-purple-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Fix Formatting (AI)"
                  >
                    {isFixingFormat ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Wand2 className="w-4 h-4" />
                    )}
                  </button>
                  {formatMessage && (
                    <div className="flex items-center gap-1.5 ml-2 px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs">
                      <CheckCircle className="w-3 h-3" />
                      <span className="max-w-[200px] truncate">{formatMessage}</span>
                    </div>
                  )}
                </div>

                {/* Editor */}
                <textarea
                  id="content-editor"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your post content here...

Use Markdown for formatting:
- ## Heading
- **bold** and *italic*
- `inline code`
- ```code blocks```
- [links](url)
- ![images](url)"
                  className="w-full h-[500px] p-4 bg-transparent text-white placeholder:text-white/20 focus:outline-none resize-none font-mono text-sm leading-relaxed"
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Slug */}
              <div className="glass rounded-2xl p-4">
                <label className="block text-sm font-medium text-white/60 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  placeholder="post-url-slug"
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 text-sm"
                />
                <p className="text-xs text-white/30 mt-2">/blog/{slug || 'your-slug'}</p>
              </div>

              {/* Excerpt */}
              <div className="glass rounded-2xl p-4">
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of the post..."
                  className="w-full h-24 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 text-sm resize-none"
                />
              </div>

              {/* Category */}
              <div className="glass rounded-2xl p-4">
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        category === cat.value
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-white/[0.02] text-white/50 border border-white/10 hover:border-white/20'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cover Image */}
              <div className="glass rounded-2xl p-4">
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="/images/blog/cover.jpg"
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 text-sm"
                />
              </div>

              {/* Status */}
              <div className="glass rounded-2xl p-4 space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-white/60">Published</span>
                  <div
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      published ? 'bg-emerald-500' : 'bg-white/20'
                    }`}
                    onClick={() => setPublished(!published)}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        published ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </label>

                <div className="border-t border-white/10 pt-4">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div>
                      <span className="text-sm font-medium text-white/60 block">Feature on Homepage</span>
                      <span className="text-xs text-white/30">Show in portfolio blog section</span>
                    </div>
                    <div
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        featuredOnHomepage ? 'bg-amber-500' : 'bg-white/20'
                      }`}
                      onClick={() => setFeaturedOnHomepage(!featuredOnHomepage)}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          featuredOnHomepage ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

function estimateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}
