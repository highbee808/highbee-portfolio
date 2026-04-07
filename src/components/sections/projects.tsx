'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, ArrowRight, Database, Bot, Layers, Zap, Home, ThumbsUp, FolderOpen, ScrollText } from 'lucide-react'
import { SafeMotionDiv } from '@/lib/motion'
import { ShimmerText } from '@/components/ui/shimmer-text'

const featuredMetrics = [
  { icon: Database, value: '27', label: 'DB Migrations' },
  { icon: Bot, value: '9', label: 'AI Agents' },
  { icon: Layers, value: '50+', label: 'Components' },
  { icon: Zap, value: '100%', label: 'TypeScript' },
]

const featuredTech = ['Next.js 15', 'TypeScript', 'Claude AI', 'Supabase', 'Tailwind']

const otherProjects = [
  {
    title: 'LaunchKit',
    description: 'Free legal document generator with Spotify-inspired design. 15 document types, Safari-optimized animations, PWA support.',
    tech: ['Next.js 14', 'TypeScript', 'Framer Motion', 'Tailwind'],
    link: 'https://launchkit.highbee.dev',
    caseStudy: '/projects/launchkit',
    icon: ScrollText,
    gradient: 'from-green-500 to-green-600',
  },
  {
    title: 'Upvotely',
    description: 'Premium feature voting platform with editorial design. Real-time voting, theme support, and polished animations.',
    tech: ['Next.js 14', 'Supabase', 'Framer Motion', 'Radix UI'],
    link: 'https://upvotely.highbee.dev',
    caseStudy: '/projects/upvotely',
    icon: ThumbsUp,
    gradient: 'from-orange-500 to-orange-600',
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

      <SafeMotionDiv
        variants={containerVariants}
        viewport={{ once: true, margin: '0px' }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Header Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-5 md:row-start-1 glass rounded-3xl p-8 flex flex-col justify-center"
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
              <ShimmerText className="text-gradient">Showcase My Skills</ShimmerText>
            </h2>
          </motion.div>

          {/* TaskRite Featured Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="md:col-span-7 md:col-start-6 md:row-start-1 md:row-span-2 relative"
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

          {/* Metrics Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-5 md:col-start-1 md:row-start-2 glass rounded-3xl p-6"
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

          {/* Other Projects - dynamically rendered */}
          {otherProjects.map((project) => {
            const ProjectIcon = project.icon
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="md:col-span-4 md:row-start-3 glass rounded-3xl p-6 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-5`}>
                  <ProjectIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-start justify-between mb-3">
                  <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-medium text-emerald-400">Live</span>
                  </div>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 rounded-md bg-white/[0.03] text-[10px] text-white/50">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-red-500 hover:text-red-400 inline-flex items-center gap-1.5 transition-colors"
                  >
                    Visit Site <ExternalLink className="w-3 h-3" />
                  </a>
                  {project.caseStudy && (
                    <Link
                      href={project.caseStudy}
                      className="text-sm text-red-500 hover:text-red-400 inline-flex items-center gap-1.5 transition-colors"
                    >
                      Case Study <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </motion.div>
            )
          })}

          {/* View All Projects CTA */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-4 md:row-start-3 glass rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/[0.02] to-red-600/[0.05] hover:border-red-500/30 transition-colors min-h-[280px]"
          >
            <Link href="/projects" className="flex flex-col items-center group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-5 shadow-[0_4px_20px_rgba(220,38,38,0.3)] group-hover:shadow-[0_6px_28px_rgba(220,38,38,0.4)] transition-shadow">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                View All Projects
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </h4>
              <p className="text-sm text-white/40">Explore more of my work</p>
            </Link>
          </motion.div>
        </div>
      </SafeMotionDiv>
    </section>
  )
}
