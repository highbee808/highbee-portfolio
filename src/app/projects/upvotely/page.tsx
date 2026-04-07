'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ExternalLink,
  ThumbsUp,
  Moon,
  Zap,
  Smartphone,
  CheckCircle2,
  Palette,
  MousePointer2,
  BarChart3,
  MessageSquare,
  Shield,
  Clock,
  Sparkles,
  Type,
  Box,
} from 'lucide-react'
import { SafeInView } from '@/lib/motion'

const stats = [
  { icon: ThumbsUp, value: 'Real-time', label: 'Voting' },
  { icon: Moon, value: 'Dark/Light', label: 'Themes' },
  { icon: Zap, value: '60fps', label: 'Animations' },
  { icon: Smartphone, value: '100%', label: 'Responsive' },
]

const features = [
  { icon: ThumbsUp, title: 'Real-time Voting', description: 'Optimistic UI updates with database sync and rollback on error.' },
  { icon: Moon, title: 'Theme Support', description: 'Full dark & light mode with smooth transitions.' },
  { icon: BarChart3, title: 'Animated Counter', description: 'Scroll-triggered counting animation with live simulation.' },
  { icon: MessageSquare, title: 'Feature Submission', description: 'Modal form with real-time validation and character counting.' },
  { icon: Clock, title: 'Status Workflow', description: 'Visual tracking from Planned to In Progress to Shipped.' },
  { icon: Shield, title: 'Duplicate Prevention', description: 'Smart localStorage tracking to prevent repeat votes.' },
]

const techStack = [
  'Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase', 'Radix UI'
]

const designPrinciples = [
  {
    icon: Palette,
    title: 'Editorial Design',
    description: 'Sharp geometric shadows, zero border radius, vermillion red accents against warm cream tones.',
  },
  {
    icon: Type,
    title: 'Intentional Typography',
    description: 'Instrument Serif paired with Satoshi for contemporary yet timeless contrast.',
  },
  {
    icon: MousePointer2,
    title: 'Interaction Design',
    description: 'Sliding fill buttons, lifting cards, spring physics vote counts.',
  },
  {
    icon: Zap,
    title: 'Performance-First',
    description: 'All animations at 60fps using GPU-accelerated CSS transforms.',
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

export default function UpvotelyCaseStudy() {
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-orange-600/10 blur-[150px]" />
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
              <div className="absolute top-0 right-0 w-40 h-40 bg-orange-600/20 blur-[80px]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-400">Live Project</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">Upvotely</h1>
                <p className="text-xl text-orange-400 font-medium mb-4">Feature Voting Platform</p>
                <p className="text-lg text-white/60 max-w-xl leading-relaxed mb-6">
                  A premium feature voting platform with editorial design, helping product teams collect feedback, prioritize requests, and build transparent roadmaps.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://upvotely.highbee.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-medium shadow-[0_4px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_6px_28px_rgba(234,88,12,0.4)] transition-shadow"
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
                  <stat.icon className="w-6 h-6 text-orange-500 mb-2" />
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
              className="md:col-span-6 glass rounded-3xl p-6 bg-gradient-to-br from-orange-600/10 to-transparent"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs mb-4">
                The Challenge
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Stand Out From Generic SaaS</h3>
              <p className="text-sm text-white/50">
                Create a feature voting solution with premium, editorial aesthetic—not the typical rounded-corner SaaS look everyone uses.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Design Approach Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-orange-500 to-transparent" />
              <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Approach</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Design <span className="text-gradient">Philosophy</span>
            </h2>
          </SafeInView>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {designPrinciples.map((principle, index) => (
              <SafeInView
                key={principle.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                  <principle.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{principle.title}</h3>
                <p className="text-sm text-white/50">{principle.description}</p>
              </SafeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-orange-500 to-transparent" />
              <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Key <span className="text-gradient">Capabilities</span>
            </h2>
          </SafeInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <SafeInView
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.description}</p>
              </SafeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Highlights */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-orange-500 to-transparent" />
              <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Technical</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Implementation <span className="text-gradient">Highlights</span>
            </h2>
          </SafeInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SafeInView
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="glass rounded-3xl p-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Optimistic Updates</h3>
              <p className="text-sm text-white/50">
                Vote counts update instantly with database sync and automatic rollback on error for seamless UX.
              </p>
            </SafeInView>

            <SafeInView
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="glass rounded-3xl p-6 bg-gradient-to-br from-orange-600/10 to-transparent"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4">
                <Box className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Spring Physics</h3>
              <p className="text-sm text-white/50">
                Framer Motion spring animations on vote counts create satisfying, natural-feeling interactions.
              </p>
            </SafeInView>

            <SafeInView
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="glass rounded-3xl p-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Vote Protection</h3>
              <p className="text-sm text-white/50">
                localStorage tracking prevents duplicate votes while maintaining a frictionless experience.
              </p>
            </SafeInView>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-orange-500 to-transparent" />
              <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">Results</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              The <span className="text-gradient">Outcome</span>
            </h2>
          </SafeInView>

          <SafeInView
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="glass rounded-3xl p-8"
          >
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              A polished, production-grade platform that demonstrates what&apos;s possible when design and engineering work together. The editorial aesthetic creates immediate differentiation, while the technical implementation ensures reliability and performance at scale.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Design', value: 'Editorial' },
                { label: 'Performance', value: '60fps' },
                { label: 'Accessibility', value: 'Full' },
                { label: 'Code Quality', value: 'Production' },
              ].map((item) => (
                <div key={item.label} className="text-center p-4 rounded-2xl bg-white/[0.02]">
                  <div className="text-xl font-bold text-gradient mb-1">{item.value}</div>
                  <div className="text-xs text-white/40 uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>
          </SafeInView>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-60 h-60 bg-orange-600/20 blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need a Feature Voting Board?
              </h2>
              <p className="text-white/50 mb-6 max-w-xl mx-auto">
                I can design and develop a custom solution tailored to your brand—with real-time functionality, responsive design, and a clean, maintainable codebase.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {['Custom design', 'Real-time updates', 'Database integration', 'Deployment support'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-sm text-white/70 border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://upvotely.highbee.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 text-white font-medium shadow-[0_4px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_6px_28px_rgba(234,88,12,0.4)] transition-shadow"
                >
                  View Upvotely
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
          </SafeInView>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-white/50 hover:text-white transition-colors">
            &larr; Back to Portfolio
          </Link>
          <div className="text-white/30 text-sm">
            &copy; 2026 Ibrahim Lawal. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
