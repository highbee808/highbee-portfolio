'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, Calendar, Clock, Search } from 'lucide-react'
import { useState } from 'react'
import type { BlogPost } from '@/lib/blog-store'

interface BlogListClientProps {
  posts: BlogPost[]
}

const categories = ['All', 'AI Development', 'TypeScript', 'Design', 'General']

const categoryColors: Record<string, string> = {
  ai: 'bg-red-500/15 text-red-400 border-red-500/30',
  typescript: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  design: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  general: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.06] blur-[150px]" />
      </div>

      {/* Header */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back Home</span>
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

      {/* Content */}
      <div className="relative z-10 px-6 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Page Header */}
          <motion.div variants={cardVariants} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">
                Blog
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
              Thoughts & <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-white/50 max-w-xl">
              Articles about AI development, TypeScript, design patterns, and building modern web applications.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div variants={cardVariants} className="mb-8 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl glass border border-white/10 bg-white/[0.02] text-white placeholder:text-white/40 focus:outline-none focus:border-red-500/30 transition-colors"
              />
            </div>

            {/* Category filters */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-white/[0.02] text-white/50 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className={`glass rounded-3xl overflow-hidden flex flex-col group cursor-pointer hover:border-white/15 transition-colors ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  {/* Cover Image */}
                  {post.coverImage && (
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized={post.coverImage.startsWith('http')}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border w-fit mb-4 ${
                        categoryColors[post.categoryColor] || categoryColors.general
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {post.category}
                    </div>

                    <h2 className={`font-serif text-white mb-3 group-hover:text-red-400 transition-colors ${
                      index === 0 ? 'text-2xl md:text-3xl' : 'text-xl'
                    }`}>
                      {post.title}
                    </h2>

                    <p className="text-white/50 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-4 text-sm text-white/40">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <span className="flex items-center gap-2 text-sm font-medium text-red-500">
                        Read
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <motion.div
              variants={cardVariants}
              className="text-center py-16"
            >
              <p className="text-white/50 mb-4">No articles found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
                className="text-red-500 hover:text-red-400 transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
