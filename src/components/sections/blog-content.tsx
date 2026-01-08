'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowUpRight, BookOpen } from 'lucide-react'
import { BlogPost } from '@/lib/blog-store'
import { ShimmerText } from '@/components/ui/shimmer-text'

interface BlogContentProps {
  posts: BlogPost[]
}

const categoryColors = {
  ai: 'bg-red-500/15 text-red-400 border-red-500/30',
  typescript: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  design: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
  general: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
}

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export function BlogContent({ posts }: BlogContentProps) {
  // No posts available
  if (posts.length === 0) {
    return (
      <section id="blog" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-4xl text-white mb-4">Coming Soon</h2>
          <p className="text-white/50">Blog posts are on the way!</p>
        </div>
      </section>
    )
  }

  const featured = posts[0]
  const others = posts.slice(1)

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section id="blog" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Ambient glows */}
      <div className="absolute top-0 right-[-20%] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />
      <div className="absolute bottom-[-30%] left-[-15%] w-[500px] h-[500px] rounded-full bg-blue-600/[0.06] blur-[150px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Header Card */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-4 glass rounded-3xl p-8 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">
                Blog
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              Latest
              <br />
              <ShimmerText className="text-gradient">Insights</ShimmerText>
            </h2>
          </motion.div>

          {/* Featured Post */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="md:col-span-8 md:row-span-2 glass rounded-3xl overflow-hidden group cursor-pointer hover:border-red-500/30 transition-colors"
          >
            <Link href={`/blog/${featured.slug}`} className="block h-full">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-black/30">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-3 text-xs text-white/40 font-mono">
                  ~/blog/{featured.categoryColor}
                </span>
              </div>

              <div className="p-6 md:p-8 flex flex-col h-[calc(100%-44px)]">
                {/* Code decoration */}
                <div className="text-xs text-white/40 font-mono mb-5">
                  <span className="text-red-500">const</span> post ={' '}
                  <span className="text-red-500">await</span> getLatest();{' '}
                  <span className="text-white/20">// Featured</span>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border w-fit mb-4 ${
                    categoryColors[featured.categoryColor as keyof typeof categoryColors]
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {featured.category}
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-white mb-4 group-hover:text-red-400 transition-colors">
                  {featured.title}
                </h3>

                <p className="text-white/50 leading-relaxed mb-6 flex-grow line-clamp-3">
                  {featured.excerpt}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-white/10">
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(featured.createdAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-medium text-red-500">
                    Read Article
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Other Posts */}
          {others.map((post) => (
            <motion.div
              key={post.slug}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="md:col-span-4 glass rounded-3xl p-6 flex flex-col group cursor-pointer hover:border-white/15 transition-colors"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border w-fit mb-3 ${
                    categoryColors[post.categoryColor as keyof typeof categoryColors]
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {post.category}
                </div>

                <h4 className="font-serif text-xl text-white mb-4 flex-grow group-hover:text-red-400 transition-colors line-clamp-2">
                  {post.title}
                </h4>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-white/40">
                    {formatDate(post.createdAt)} · {post.readTime}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-red-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-4 glass rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/[0.02] to-red-600/[0.05] hover:border-red-500/30 transition-colors cursor-pointer min-h-[200px]"
          >
            <Link href="/blog" className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-4 shadow-[0_4px_20px_rgba(220,38,38,0.3)]">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2 flex items-center gap-2">
                View All Posts
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="text-sm text-white/40">Explore more articles</p>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
