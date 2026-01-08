'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowLeft,
  Download,
  Linkedin,
  Twitter,
  FileText,
  Images,
  Copy,
  Check,
  ExternalLink,
  Share2,
} from 'lucide-react'
import { taskRiteData, slideContent } from '@/lib/case-study/taskrite-data'

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

export default function AssetsPage() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const copyToClipboard = async (url: string, id: string) => {
    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url
    await navigator.clipboard.writeText(fullUrl)
    setCopiedUrl(id)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  const assetCategories = [
    {
      id: 'carousel',
      title: 'LinkedIn Carousel',
      description: '9 professionally designed slides for LinkedIn posts',
      icon: Images,
      color: 'from-blue-500 to-blue-600',
      link: '/projects/taskrite/slides',
      dimensions: '1080×1350',
      count: 9,
    },
    {
      id: 'pdf',
      title: 'PDF Case Study',
      description: 'Print-ready case study document for client pitches',
      icon: FileText,
      color: 'from-red-500 to-red-600',
      link: '/projects/taskrite/assets/pdf',
      dimensions: 'A4',
      count: 1,
    },
    {
      id: 'twitter',
      title: 'Twitter/X Card',
      description: 'Optimized preview image for Twitter sharing',
      icon: Twitter,
      color: 'from-sky-500 to-sky-600',
      imageUrl: '/projects/taskrite/slides/twitter/opengraph-image',
      dimensions: '1200×675',
      count: 1,
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Post',
      description: 'Square format image for LinkedIn feed posts',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-700',
      imageUrl: '/projects/taskrite/slides/linkedin/opengraph-image',
      dimensions: '1080×1080',
      count: 1,
    },
  ]

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-zinc-600/[0.06] blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/projects/taskrite"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Case Study</span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href={taskRiteData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Try TaskRite</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="relative z-10 px-6 pt-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/30 mb-6">
              <Share2 className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400">Shareable Assets</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              TaskRite <span className="text-gradient">Media Kit</span>
            </h1>
            <p className="text-white/60 max-w-xl mx-auto">
              Professional assets for sharing the TaskRite case study on social media, client pitches, and presentations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Asset Categories */}
      <section className="relative z-10 px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {assetCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
                className="group"
              >
                <div className="glass rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">
                        {category.dimensions}
                      </span>
                      {category.count > 1 && (
                        <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded">
                          {category.count} files
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{category.title}</h3>
                  <p className="text-white/50 text-sm mb-6">{category.description}</p>

                  <div className="flex flex-wrap gap-3">
                    {category.link && (
                      <Link
                        href={category.link}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </Link>
                    )}
                    {category.imageUrl && (
                      <>
                        <button
                          onClick={() => downloadImage(
                            category.imageUrl!,
                            `taskrite-${category.id}.png`
                          )}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                        <button
                          onClick={() => copyToClipboard(category.imageUrl!, category.id)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm"
                        >
                          {copiedUrl === category.id ? (
                            <>
                              <Check className="w-4 h-4 text-green-400" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy URL
                            </>
                          )}
                        </button>
                      </>
                    )}
                    {category.id === 'carousel' && (
                      <Link
                        href="/projects/taskrite/slides"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download All
                      </Link>
                    )}
                    {category.id === 'pdf' && (
                      <Link
                        href="/projects/taskrite/assets/pdf"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Generate PDF
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">
                Quick Preview
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* First 4 carousel slides preview */}
              {slideContent.slice(0, 4).map((slide) => (
                <div
                  key={slide.id}
                  className="group relative aspect-[1080/1350] rounded-2xl overflow-hidden glass border border-white/10"
                >
                  <Image
                    src={`/projects/taskrite/slides/${slide.id}/opengraph-image`}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs text-red-400">Slide {slide.id}</span>
                      <p className="text-white font-medium text-sm">{slide.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/projects/taskrite/slides"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                View all 9 slides
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Usage Tips */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">How to Use</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-3">
                  <Linkedin className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-medium text-white mb-2">LinkedIn Carousel</h3>
                <p className="text-sm text-white/50">
                  Download all 9 slides and upload them as a document post. Add a compelling caption about your project.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center mb-3">
                  <Twitter className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="font-medium text-white mb-2">Twitter/X</h3>
                <p className="text-sm text-white/50">
                  Share the case study URL - the Twitter card image will automatically appear in your tweet preview.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-medium text-white mb-2">Client Pitches</h3>
                <p className="text-sm text-white/50">
                  Use the PDF version for professional presentations. Print or attach to proposals and portfolios.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
