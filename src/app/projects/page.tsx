'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ExternalLink,
  ArrowRight,
  Database,
  Bot,
  Layers,
  Zap,
  Home,
  Globe,
  ThumbsUp,
  CheckCircle2,
  Code2,
  Sparkles,
} from 'lucide-react'
import { ShimmerText } from '@/components/ui/shimmer-text'

const taskRiteMetrics = [
  { icon: Database, value: '27', label: 'DB Migrations' },
  { icon: Bot, value: '9', label: 'AI Agents' },
  { icon: Layers, value: '50+', label: 'Components' },
  { icon: Zap, value: '100%', label: 'TypeScript' },
]

const taskRiteTech = ['Next.js 15', 'TypeScript', 'Claude AI', 'Supabase', 'Tailwind']

const projects = [
  {
    title: 'Upvotely',
    tagline: 'Premium Feature Voting',
    description: 'Editorial-inspired feature voting platform with real-time updates, theme support, and polished micro-interactions.',
    tech: ['Next.js 14', 'Supabase', 'Framer Motion', 'Radix UI'],
    link: 'https://upvotely.highbee.dev',
    caseStudy: '/projects/upvotely',
    icon: ThumbsUp,
    gradient: 'from-orange-500 to-orange-600',
    accentColor: 'orange',
    borderHover: 'hover:border-orange-500/30',
  },
  {
    title: 'RentRight',
    tagline: 'Property Rentals for Nigeria',
    description: 'Digital marketplace connecting landlords and tenants with digital receipts, rent tracking, and secure messaging.',
    tech: ['Next.js 16', 'Supabase', 'Paystack', 'PWA'],
    link: 'https://rentrightng.vercel.app',
    caseStudy: '/projects/rentright',
    icon: Home,
    gradient: 'from-emerald-500 to-emerald-600',
    accentColor: 'emerald',
    borderHover: 'hover:border-emerald-500/30',
  },
  {
    title: 'Portfolio Site',
    tagline: 'AI-Enhanced Portfolio',
    description: 'This website! Featuring an intelligent chat assistant powered by Claude that can answer questions about my work.',
    tech: ['Next.js 15', 'Claude AI', 'Framer Motion', 'Tailwind'],
    link: 'https://highbee.dev',
    icon: Globe,
    gradient: 'from-slate-500 to-slate-600',
    accentColor: 'slate',
    borderHover: 'hover:border-slate-500/30',
  },
]

const stats = [
  { icon: CheckCircle2, value: '4', label: 'Live Projects' },
  { icon: Code2, value: '100%', label: 'TypeScript' },
  { icon: Sparkles, value: '3', label: 'AI-Powered' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
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

export default function ProjectsPage() {
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
            <span className="hidden sm:inline">Back Home</span>
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
      <section className="relative pt-8 pb-20 px-6 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-red-600/[0.08] blur-[150px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/[0.05] blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-zinc-500/[0.06] blur-[120px]" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto"
        >
          {/* Main Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Header Card */}
            <motion.div
              variants={cardVariants}
              className="md:col-span-5 glass rounded-3xl p-8 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
                <span className="text-xs font-medium text-red-500 uppercase tracking-wider">
                  Portfolio
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                My
                <br />
                <ShimmerText className="text-gradient">Projects</ShimmerText>
              </h1>
              <p className="text-white/50 leading-relaxed">
                A collection of products I&apos;ve designed and built, from AI-powered applications to beautiful interfaces.
              </p>
            </motion.div>

            {/* TaskRite Featured Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="md:col-span-7 md:row-span-2 relative"
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
                    <span className="text-xs font-medium text-emerald-400">Featured Project</span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">TaskRite</h2>
                <p className="text-white/70 leading-relaxed mb-4 max-w-md">
                  AI-powered task management that helps you break down complex goals into actionable steps with 9 specialized AI agents.
                </p>

                {/* Tech badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {taskRiteTech.map((tech) => (
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

            {/* Stats Card */}
            <motion.div
              variants={cardVariants}
              className="md:col-span-5 glass rounded-3xl p-6"
            >
              <div className="grid grid-cols-3 gap-4 h-full">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                  >
                    <stat.icon className="w-6 h-6 text-red-500 mb-2" />
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-[9px] text-white/40 uppercase tracking-wide text-center">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* TaskRite Metrics Mini Card */}
            <motion.div
              variants={cardVariants}
              className="md:col-span-12 glass rounded-3xl p-4"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-xs text-white/40 uppercase tracking-wider">TaskRite Metrics</span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent max-w-[100px]" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {taskRiteMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.08 }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] transition-colors"
                  >
                    <metric.icon className="w-5 h-5 text-red-500" />
                    <div>
                      <span className="text-lg font-bold text-white">{metric.value}</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-wide ml-1">{metric.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Other Projects */}
            {projects.map((project, index) => {
              const ProjectIcon = project.icon
              const accentClasses = {
                orange: {
                  iconBg: 'from-orange-500 to-orange-600',
                  text: 'text-orange-500 hover:text-orange-400',
                },
                emerald: {
                  iconBg: 'from-emerald-500 to-emerald-600',
                  text: 'text-emerald-500 hover:text-emerald-400',
                },
                slate: {
                  iconBg: 'from-slate-500 to-slate-600',
                  text: 'text-slate-400 hover:text-slate-300',
                },
              }[project.accentColor]

              return (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className={`md:col-span-4 glass rounded-3xl p-6 flex flex-col transition-colors ${project.borderHover}`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                    <ProjectIcon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] font-medium text-emerald-400">Live</span>
                    </div>
                  </div>

                  <p className="text-xs text-white/40 mb-3">{project.tagline}</p>

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
                      className={`text-sm inline-flex items-center gap-1.5 transition-colors ${accentClasses?.text}`}
                    >
                      Visit Site <ExternalLink className="w-3 h-3" />
                    </a>
                    {project.caseStudy && (
                      <Link
                        href={project.caseStudy}
                        className={`text-sm inline-flex items-center gap-1.5 transition-colors ${accentClasses?.text}`}
                      >
                        Case Study <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-white/40 mb-4">Interested in working together?</p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  )
}
