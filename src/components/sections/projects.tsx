'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Database, Bot, Layers, Zap, Home, Globe, FilePlus } from 'lucide-react'

const featuredMetrics = [
  { icon: Database, value: '27', label: 'DB Migrations' },
  { icon: Bot, value: '9', label: 'AI Agents' },
  { icon: Layers, value: '50+', label: 'Components' },
  { icon: Zap, value: '100%', label: 'TypeScript' },
]

const featuredTech = ['Next.js 15', 'TypeScript', 'Claude AI', 'Supabase', 'Tailwind']

const otherProjects = [
  {
    title: 'RentRight',
    description: 'Property rental marketplace for Nigeria. Digital receipts, rent tracking, and landlord-tenant messaging.',
    tech: ['Next.js 16', 'Supabase', 'Paystack', 'PWA'],
    status: 'Live',
    link: 'https://rentrightng.vercel.app',
    caseStudy: '/projects/rentright',
    icon: Home,
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Portfolio Site',
    description: 'This website! Built with Next.js 15, featuring an AI chat assistant powered by Claude.',
    tech: ['Next.js 15', 'Claude AI', 'Framer Motion', 'Tailwind'],
    status: 'Live',
    link: 'https://highbee.dev',
    icon: Globe,
    gradient: 'from-slate-500 to-slate-600',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
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

export function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Ambient glow */}
      <div className="absolute top-[15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[150px]" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-zinc-500/[0.08] blur-[150px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Header Card - Order 1 on mobile */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-5 glass rounded-3xl p-8 flex flex-col justify-center order-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">
                Featured Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Projects That
              <br />
              <span className="text-gradient">Showcase My Skills</span>
            </h2>
          </motion.div>

          {/* TaskRite Featured Card - Order 2 on mobile */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="md:col-span-7 md:row-span-2 relative order-2"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-br from-red-600 via-zinc-600 to-red-600 bg-[length:200%_200%] animate-gradient-shift">
              <div className="absolute inset-[2px] rounded-[22px] bg-[#0a0a0f]" />
            </div>

            <div className="relative h-full rounded-3xl p-6 md:p-8 bg-gradient-to-br from-red-600/[0.08] to-transparent flex flex-col">
              {/* Live Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400">Live Project</span>
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">TaskRite</h3>
              <p className="text-white/70 leading-relaxed mb-4 max-w-md">
                AI-powered task management that helps you break down complex goals into actionable steps with 9 specialized AI agents.
              </p>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredTech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/70 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Mock Browser */}
              <div className="flex-grow rounded-xl bg-[#0d0d12]/80 border border-white/10 overflow-hidden mb-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] border-b border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="ml-3 text-[10px] text-white/40">trytaskrite.com</span>
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03]">
                    <div className="w-4 h-4 rounded bg-emerald-500/50 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 h-2.5 rounded bg-white/15 w-3/4" />
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px]">Done</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03]">
                    <div className="w-4 h-4 rounded border-2 border-white/20" />
                    <div className="flex-1 h-2.5 rounded bg-white/15 w-1/2" />
                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[9px]">In Progress</span>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03]">
                    <div className="w-4 h-4 rounded border-2 border-white/20" />
                    <div className="flex-1 h-2.5 rounded bg-white/15 w-2/3" />
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[9px]">AI Suggested</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  href="https://trytaskrite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-medium shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.4)] transition-shadow"
                >
                  View Live Demo
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
                <Link href="/projects/taskrite">
                  <motion.span
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all w-full sm:w-auto"
                  >
                    Case Study
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Metrics Card - Order 3 on mobile */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-5 glass rounded-3xl p-6 order-3"
          >
            <div className="grid grid-cols-2 gap-4 h-full">
              {featuredMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] transition-colors"
                >
                  <metric.icon className="w-8 h-8 text-red-500 mb-2" />
                  <span className="text-2xl font-bold text-white">{metric.value}</span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wide">{metric.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RentRight Card - Order 4 on mobile */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-4 glass rounded-3xl p-6 flex flex-col order-4"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${otherProjects[0].gradient} flex items-center justify-center mb-5`}>
              <Home className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-xl font-semibold text-white">{otherProjects[0].title}</h4>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-400">Live</span>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4 flex-grow">
              {otherProjects[0].description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {otherProjects[0].tech.map((t) => (
                <span key={t} className="px-2 py-1 rounded-md bg-white/[0.03] text-[10px] text-white/50">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center gap-4">
              <a
                href={otherProjects[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-red-500 hover:text-red-400 inline-flex items-center gap-1.5 transition-colors"
              >
                Visit Site <ExternalLink className="w-3 h-3" />
              </a>
              <Link
                href={otherProjects[0].caseStudy!}
                className="text-sm text-red-500 hover:text-red-400 inline-flex items-center gap-1.5 transition-colors"
              >
                Case Study <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </motion.div>

          {/* Portfolio Card - Order 5 on mobile */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-4 glass rounded-3xl p-6 flex flex-col order-5"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${otherProjects[1].gradient} flex items-center justify-center mb-5`}>
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-xl font-semibold text-white">{otherProjects[1].title}</h4>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-400">Live</span>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4 flex-grow">
              {otherProjects[1].description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {otherProjects[1].tech.map((t) => (
                <span key={t} className="px-2 py-1 rounded-md bg-white/[0.03] text-[10px] text-white/50">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-4 border-t border-white/10">
              <a
                href={otherProjects[1].link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-red-500 hover:text-red-400 inline-flex items-center gap-1.5 transition-colors"
              >
                Visit Site <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* CTA Card - Order 6 on mobile */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-4 glass rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-gradient-to-br from-white/[0.03] to-red-600/[0.05] hover:from-white/[0.05] hover:to-red-600/[0.1] transition-all order-6"
          >
            <FilePlus className="w-12 h-12 text-red-500/80 mb-4" />
            <span className="text-lg font-semibold text-white mb-2">More Coming Soon</span>
            <span className="text-sm text-white/40">New projects in development</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
