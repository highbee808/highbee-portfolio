'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Sparkles,
  Wand2,
  FileText,
  Lightbulb,
  Briefcase,
  MessageSquare,
  GraduationCap,
  Code,
  Loader2,
  Check,
  Edit,
  RefreshCw,
  ChevronDown,
  Eye,
} from 'lucide-react'
import type { PredefinedTopic } from '@/lib/blog-agent/topics'
import type { BlogPost } from '@/lib/blog-store'

interface BlogGeneratorProps {
  predefinedTopics: PredefinedTopic[]
}

type TopicMode = 'custom' | 'predefined' | 'ai'
type Tone = 'professional' | 'conversational' | 'educational' | 'technical'
type Category = 'ai' | 'typescript' | 'design' | 'general'

const tones: { value: Tone; label: string; description: string; icon: React.ReactNode }[] = [
  {
    value: 'professional',
    label: 'Professional',
    description: 'Authoritative, industry-focused',
    icon: <Briefcase className="w-5 h-5" />,
  },
  {
    value: 'conversational',
    label: 'Conversational',
    description: 'Friendly, relatable storytelling',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    value: 'educational',
    label: 'Educational',
    description: 'Tutorial-style, beginner-friendly',
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    value: 'technical',
    label: 'Technical',
    description: 'Deep-dive, code-heavy',
    icon: <Code className="w-5 h-5" />,
  },
]

const categories: { value: Category; label: string }[] = [
  { value: 'ai', label: 'AI Development' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'design', label: 'Design' },
  { value: 'general', label: 'General' },
]

interface GeneratedResult {
  post: BlogPost
  generated: {
    title: string
    excerpt: string
    content: string
  }
  topicUsed: string
}

export function BlogGenerator({ predefinedTopics }: BlogGeneratorProps) {
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Topic selection
  const [topicMode, setTopicMode] = useState<TopicMode>('custom')
  const [customTopic, setCustomTopic] = useState('')
  const [selectedPredefined, setSelectedPredefined] = useState<string | null>(null)
  const [showPredefinedDropdown, setShowPredefinedDropdown] = useState(false)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPredefinedDropdown(false)
      }
    }

    if (showPredefinedDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showPredefinedDropdown])

  // Configuration
  const [tone, setTone] = useState<Tone>('conversational')
  const [category, setCategory] = useState<Category>('ai')

  // Generation state
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<GeneratedResult | null>(null)

  // AI suggestions
  const [suggestions, setSuggestions] = useState<{ title: string; category: Category; angle: string }[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const unusedTopics = predefinedTopics.filter(t => !t.used)

  const handleGenerate = async () => {
    setGenerating(true)
    setError('')
    setResult(null)

    try {
      const payload: Record<string, unknown> = { tone, category }

      if (topicMode === 'custom') {
        if (!customTopic.trim()) {
          setError('Please enter a topic')
          setGenerating(false)
          return
        }
        payload.topic = customTopic
      } else if (topicMode === 'predefined') {
        if (!selectedPredefined) {
          setError('Please select a topic')
          setGenerating(false)
          return
        }
        payload.predefinedTopicId = selectedPredefined
      } else {
        payload.suggestTopic = true
      }

      const res = await fetch('/api/admin/blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Generation failed')
        return
      }

      setResult(data)
    } catch {
      setError('Something went wrong')
    } finally {
      setGenerating(false)
    }
  }

  const handleSuggestTopics = async () => {
    setLoadingSuggestions(true)
    try {
      const res = await fetch(`/api/admin/blog/generate?type=suggestions&category=${category}`)
      const data = await res.json()
      if (data.suggestions) {
        setSuggestions(data.suggestions)
      }
    } catch {
      console.error('Failed to get suggestions')
    } finally {
      setLoadingSuggestions(false)
    }
  }

  const handleUseSuggestion = (suggestion: { title: string; category: Category }) => {
    setCustomTopic(suggestion.title)
    setCategory(suggestion.category)
    setTopicMode('custom')
    setSuggestions([])
  }

  const handleEditPost = () => {
    if (result?.post.id) {
      router.push(`/admin/blog/${result.post.id}/edit`)
    }
  }

  const handleReset = () => {
    setResult(null)
    setCustomTopic('')
    setSelectedPredefined(null)
  }

  const selectedTopic = selectedPredefined
    ? predefinedTopics.find(t => t.id === selectedPredefined)
    : null

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-600/5 blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[60px]" />
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
              <h1 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-400" />
                AI Blog Generator
              </h1>
              <p className="text-xs text-white/40">Generate engaging blog posts with AI</p>
            </div>
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

          {!result ? (
            <div className="space-y-8">
              {/* Topic Selection */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Choose Your Topic</h2>

                {/* Topic Mode Tabs */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setTopicMode('custom')}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      topicMode === 'custom'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-white/[0.02] text-white/50 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Custom Topic
                  </button>
                  <button
                    onClick={() => setTopicMode('predefined')}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      topicMode === 'predefined'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-white/[0.02] text-white/50 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    From List ({unusedTopics.length})
                  </button>
                  <button
                    onClick={() => setTopicMode('ai')}
                    className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      topicMode === 'ai'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-white/[0.02] text-white/50 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Wand2 className="w-4 h-4 inline mr-2" />
                    AI Picks
                  </button>
                </div>

                {/* Custom Topic Input */}
                {topicMode === 'custom' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={customTopic}
                      onChange={(e) => setCustomTopic(e.target.value)}
                      placeholder="Enter your topic (e.g., 'Building AI Agents with Claude')"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleSuggestTopics}
                        disabled={loadingSuggestions}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white/70 hover:text-white hover:bg-white/20 transition-colors text-sm"
                      >
                        {loadingSuggestions ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Lightbulb className="w-4 h-4" />
                        )}
                        Get AI Suggestions
                      </button>
                    </div>

                    {/* AI Suggestions */}
                    {suggestions.length > 0 && (
                      <div className="space-y-2 mt-4">
                        <p className="text-sm text-white/40">Click to use:</p>
                        {suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => handleUseSuggestion(s)}
                            className="w-full text-left p-3 rounded-lg bg-white/[0.02] border border-white/10 hover:border-red-500/30 transition-colors"
                          >
                            <p className="text-white font-medium">{s.title}</p>
                            <p className="text-xs text-white/40 mt-1">{s.angle}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Predefined Topics Dropdown */}
                {topicMode === 'predefined' && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowPredefinedDropdown(!showPredefinedDropdown)}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-left flex items-center justify-between hover:border-white/20 transition-colors"
                    >
                      <span className={selectedTopic ? 'text-white' : 'text-white/30'}>
                        {selectedTopic?.title || 'Select a topic...'}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${showPredefinedDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showPredefinedDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 max-h-72 overflow-y-auto scroll-smooth rounded-xl bg-[#0d0d14] border border-white/20 shadow-2xl z-50 overscroll-contain">
                        {unusedTopics.length === 0 ? (
                          <p className="p-4 text-white/40 text-sm">All topics have been used</p>
                        ) : (
                          unusedTopics.map((topic) => (
                            <button
                              key={topic.id}
                              onClick={() => {
                                setSelectedPredefined(topic.id)
                                setCategory(topic.category)
                                setShowPredefinedDropdown(false)
                              }}
                              className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/10 last:border-0"
                            >
                              <p className="text-white font-medium">{topic.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-white/40 capitalize">{topic.category}</span>
                                <span className="text-xs text-white/20">|</span>
                                <span className="text-xs text-white/40 capitalize">{topic.suggestedTone}</span>
                              </div>
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* AI Picks Info */}
                {topicMode === 'ai' && (
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <p className="text-white/70 text-sm">
                      AI will pick a random unused topic from your list, or generate a fresh topic idea if none are available.
                    </p>
                  </div>
                )}
              </div>

              {/* Tone Selection */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Select Tone</h2>
                <div className="grid grid-cols-2 gap-3">
                  {tones.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        tone === t.value
                          ? 'bg-red-500/20 border border-red-500/30'
                          : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className={`mb-2 ${tone === t.value ? 'text-red-400' : 'text-white/40'}`}>
                        {t.icon}
                      </div>
                      <p className={`font-medium ${tone === t.value ? 'text-white' : 'text-white/70'}`}>
                        {t.label}
                      </p>
                      <p className="text-xs text-white/40 mt-1">{t.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Selection */}
              <div className="glass rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Category</h2>
                <div className="grid grid-cols-4 gap-2">
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

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:from-red-500 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating... (this may take 30-60 seconds)
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Blog Post
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Result View */
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Post Generated!</h2>
                    <p className="text-sm text-white/40">Saved as draft</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-white/40 mb-1">Title</p>
                    <p className="text-white font-medium">{result.generated.title}</p>
                  </div>

                  <div>
                    <p className="text-xs text-white/40 mb-1">Excerpt</p>
                    <p className="text-white/70">{result.generated.excerpt}</p>
                  </div>

                  <div>
                    <p className="text-xs text-white/40 mb-1">Topic Used</p>
                    <p className="text-white/70">{result.topicUsed}</p>
                  </div>

                  <div>
                    <p className="text-xs text-white/40 mb-2">Preview</p>
                    <div className="max-h-64 overflow-y-auto p-4 rounded-lg bg-white/[0.02] border border-white/10">
                      <pre className="text-sm text-white/60 whitespace-pre-wrap font-sans">
                        {result.generated.content.slice(0, 1000)}
                        {result.generated.content.length > 1000 && '...'}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/blog/${result.post.slug}?preview=true`}
                  target="_blank"
                  className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </Link>
                <button
                  onClick={handleEditPost}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-medium hover:from-red-500 hover:to-red-600 transition-all flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Before Publishing
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate Another
                </button>
              </div>

              <Link
                href="/admin/blog"
                className="block w-full py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white/60 font-medium hover:bg-white/10 hover:text-white transition-all text-center"
              >
                Back to Blog Posts
              </Link>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
