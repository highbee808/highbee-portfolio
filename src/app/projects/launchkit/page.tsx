'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ExternalLink,
  ScrollText,
  Zap,
  Smartphone,
  FileText,
  Clock,
  Shield,
  Sparkles,
  Palette,
  Code2,
  Bug,
  CheckCircle2,
  Layers,
  Download,
  Globe,
} from 'lucide-react'

const stats = [
  { icon: FileText, value: '15', label: 'Documents' },
  { icon: Clock, value: '<60s', label: 'Generation' },
  { icon: Zap, value: '60fps', label: 'Animations' },
  { icon: Smartphone, value: 'PWA', label: 'Installable' },
]

const features = [
  { icon: FileText, title: '15 Document Types', description: 'Privacy policies, terms of service, NDAs, GDPR checklists, and more.' },
  { icon: Shield, title: 'GDPR & CCPA Ready', description: 'All templates designed for compliance with major privacy regulations.' },
  { icon: Zap, title: 'Instant Generation', description: 'Client-side processing means documents generate in under 60 seconds.' },
  { icon: Download, title: 'Multiple Exports', description: 'Download as Markdown, HTML, or copy directly to clipboard.' },
  { icon: Globe, title: 'No Account Required', description: 'Generate unlimited documents without signup or payment.' },
  { icon: Smartphone, title: 'PWA Support', description: 'Install as an app on iOS and Android for quick access.' },
]

const techStack = [
  'Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Radix UI', 'PWA'
]

const designPrinciples = [
  {
    icon: Palette,
    title: 'Spotify-Inspired Theme',
    description: 'Dark background with signature green (#22c55e) accents. Premium feel without the premium price.',
  },
  {
    icon: Layers,
    title: 'Glass Morphism',
    description: 'Frosted glass cards with backdrop blur, subtle borders, and layered shadows for depth.',
  },
  {
    icon: Sparkles,
    title: 'Polished Animations',
    description: 'Staggered fade-ins, press-scale interactions, and smooth transitions throughout.',
  },
  {
    icon: Code2,
    title: 'DM Sans + Instrument Serif',
    description: 'Clean sans-serif for body text paired with editorial italic serif for headlines.',
  },
]

const safariChallenges = [
  {
    problem: 'Animation Lag',
    solution: 'GPU acceleration via translate3d(0,0,0) and backface-visibility: hidden',
  },
  {
    problem: 'Backdrop-blur Flickering',
    solution: 'isolation: isolate creates new stacking context, fixes WebKit rendering',
  },
  {
    problem: 'Accordion Height Bugs',
    solution: 'Switched from CSS max-height transitions to conditional rendering',
  },
  {
    problem: 'Dynamic Content Issues',
    solution: 'MutationObserver auto-fixes elements added after initial render',
  },
]

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

export default function LaunchKitCaseStudy() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Projects</span>
          </Link>

          <Link
            href="/"
            className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-red-500/50">
              <Image
                src="/images/profile-cartoon.png"
                alt="Ibrahim Lawal"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-white/70">Ibrahim Lawal</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-green-600/10 blur-[150px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-zinc-500/10 blur-[100px]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto"
        >
          {/* Bento Grid Hero */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Main Hero Card */}
            <motion.div
              variants={cardVariants}
              className="md:col-span-8 glass rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-600/20 blur-[80px]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-400">Live Project</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">LaunchKit</h1>
                <p className="text-xl text-green-400 font-medium mb-4">Legal Document Generator</p>
                <p className="text-lg text-white/60 max-w-xl leading-relaxed mb-6">
                  A free, premium legal document generator with a Spotify-inspired dark theme. Generate privacy policies, terms of service, and 13 other document types in under 60 seconds.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://launchkit.highbee.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium shadow-[0_4px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_6px_28px_rgba(34,197,94,0.4)] transition-shadow"
                  >
                    Visit Live Site
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={cardVariants} className="md:col-span-4 grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center"
                >
                  <stat.icon className="w-6 h-6 text-green-500 mb-2" />
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Tech Stack Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="md:col-span-6 glass rounded-3xl p-6"
            >
              <h3 className="text-xs font-medium text-white/30 uppercase tracking-wider mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-sm bg-white/5 text-white/70 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Challenge Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="md:col-span-6 glass rounded-3xl p-6 bg-gradient-to-br from-green-600/10 to-transparent"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs mb-4">
                The Challenge
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Legal Docs That Don&apos;t Suck</h3>
              <p className="text-sm text-white/50">
                Build a premium document generator that&apos;s free, fast, and beautiful—proving legal tools don&apos;t have to be ugly or expensive.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Design Approach Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-green-500 to-transparent" />
              <span className="text-xs font-medium text-green-500 uppercase tracking-wider">Approach</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Design <span className="text-gradient">Philosophy</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {designPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                  <principle.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{principle.title}</h3>
                <p className="text-sm text-white/50">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-green-500 to-transparent" />
              <span className="text-xs font-medium text-green-500 uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Key <span className="text-gradient">Capabilities</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safari Challenge Section - The Star of the Show */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">Technical Deep Dive</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              The Safari <span className="text-gradient">Challenge</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-2xl">
              During testing, I discovered severe performance issues on Safari and iOS—animations stuttered, backdrop-blur flickered, and accordions broke. Here&apos;s how I fixed it.
            </p>
          </motion.div>

          {/* Problem/Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {safariChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.problem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Bug className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{challenge.problem}</h3>
                    <p className="text-sm text-white/50">{challenge.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Solution Architecture Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="glass rounded-3xl p-8 bg-gradient-to-br from-green-600/10 to-transparent"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Three-Part Solution Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-white/[0.02]">
                <div className="text-green-400 text-sm font-medium mb-2">1. CSS Layer</div>
                <p className="text-xs text-white/40 font-mono">safari-performance.css</p>
                <p className="text-sm text-white/50 mt-2">GPU acceleration classes (.gpu-boost, .blur-fix) with translate3d and isolation.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02]">
                <div className="text-green-400 text-sm font-medium mb-2">2. Runtime Layer</div>
                <p className="text-xs text-white/40 font-mono">safari.ts</p>
                <p className="text-sm text-white/50 mt-2">Browser detection + MutationObserver to auto-fix dynamically rendered elements.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02]">
                <div className="text-green-400 text-sm font-medium mb-2">3. Component Layer</div>
                <p className="text-xs text-white/40 font-mono">motion.tsx</p>
                <p className="text-sm text-white/50 mt-2">Safari-safe Framer Motion wrappers with adjusted timing and GPU hints.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-green-500 to-transparent" />
              <span className="text-xs font-medium text-green-500 uppercase tracking-wider">Results</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              The <span className="text-gradient">Outcome</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="glass rounded-3xl p-8"
          >
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              A polished, production-grade legal document generator built in 2 weeks. The Safari optimization work produced a reusable &quot;Safari Performance Starter Kit&quot; that can be dropped into any future project.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Build Time', value: '2 Weeks' },
                { label: 'Safari Bugs', value: '0' },
                { label: 'Documents', value: '15 Types' },
                { label: 'Cost', value: 'Free' },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-2xl bg-white/[0.02]">
                  <div className="text-xl font-bold text-gradient mb-1">{item.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-60 h-60 bg-green-600/20 blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need a Custom Web Application?
              </h2>
              <p className="text-white/50 mb-6 max-w-xl mx-auto">
                I build fast, polished web apps with attention to detail—including cross-browser compatibility and mobile optimization.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['Performance-first', 'Mobile optimized', 'Safari tested', 'TypeScript'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/70 border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://launchkit.highbee.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium shadow-[0_4px_20px_rgba(34,197,94,0.3)] hover:shadow-[0_6px_28px_rgba(34,197,94,0.4)] transition-shadow"
                >
                  View LaunchKit
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-white/50 hover:text-white transition-colors">
            &larr; Back to Portfolio
          </Link>
          <div className="text-white/30 text-sm">
            &copy; 2025 Ibrahim Lawal. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
