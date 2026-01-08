'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Download, Linkedin, Twitter, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { slideContent } from '@/lib/case-study/taskrite-data'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function SlidesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const downloadImage = async (slideId: string, slideName: string) => {
    const imageUrl = `/projects/taskrite/slides/${slideId}/opengraph-image`
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `taskrite-slide-${slideId}-${slideName.toLowerCase().replace(/\s+/g, '-')}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-zinc-600/[0.06] blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/projects/taskrite"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Case Study</span>
          </Link>

          <Link
            href="/projects/taskrite/assets"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            All Assets
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="relative z-10 px-6 pt-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/30 mb-6">
              <Linkedin className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">LinkedIn Carousel</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              TaskRite Case Study <span className="text-gradient">Slides</span>
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
              9 professionally designed slides for LinkedIn carousels. Click to download individual slides or download all at once.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Slides Grid */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {slideContent.map((slide, index) => (
              <motion.div
                key={slide.id}
                variants={cardVariants}
                className="group relative"
              >
                <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
                  {/* Slide Preview */}
                  <div className="relative aspect-[1080/1350] bg-[#0a0a0f]">
                    <Image
                      src={`/projects/taskrite/slides/${slide.id}/opengraph-image`}
                      alt={`Slide ${slide.id}: ${slide.title}`}
                      fill
                      className="object-cover"
                      unoptimized
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => downloadImage(slide.id, slide.title)}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        title="Download"
                      >
                        <Download className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(
                          `${window.location.origin}/projects/taskrite/slides/${slide.id}/opengraph-image`,
                          slide.id
                        )}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        title="Copy URL"
                      >
                        {copiedId === slide.id ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Slide Info */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-red-500 font-medium">
                        Slide {slide.id}
                      </span>
                      <h3 className="text-white font-medium">{slide.title}</h3>
                    </div>
                    <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">
                      1080×1350
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Download All Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="glass rounded-3xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-4">
                Share on LinkedIn
              </h2>
              <p className="text-white/60 mb-6">
                Download all slides and upload them as a carousel post to showcase your work.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={async () => {
                    for (const slide of slideContent) {
                      await downloadImage(slide.id, slide.title)
                      await new Promise(resolve => setTimeout(resolve, 500))
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.4)] transition-shadow"
                >
                  <Download className="w-4 h-4" />
                  Download All Slides
                </button>
                <Link
                  href="/projects/taskrite/assets"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors"
                >
                  More Formats
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
