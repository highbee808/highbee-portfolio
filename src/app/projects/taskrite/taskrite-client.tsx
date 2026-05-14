'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ExternalLink,
  Database,
  Bot,
  Layers,
  Zap,
  CheckCircle2,
  MessageSquare,
  Brain,
  Target,
  Clock,
  Users,
  Sparkles,
  Shield,
  Workflow,
  BarChart3,
} from 'lucide-react'
import { SafeInView } from '@/lib/motion'

const metrics = [
  { icon: Database, value: '27', label: 'DB Migrations' },
  { icon: Bot, value: '9', label: 'AI Agents' },
  { icon: Layers, value: '50+', label: 'Components' },
  { icon: Zap, value: '100%', label: 'TypeScript' },
]

const techStack = [
  { name: 'Next.js 15', category: 'Framework' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Claude AI', category: 'AI Engine' },
  { name: 'Supabase', category: 'Backend' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Framer Motion', category: 'Animation' },
]

const features = [
  {
    icon: Brain,
    title: 'AI Task Breakdown',
    description: 'Intelligent decomposition of complex goals into actionable subtasks.',
  },
  {
    icon: MessageSquare,
    title: 'Multi-Phase Conversations',
    description: 'Guided conversations that adapt based on task type and context.',
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Visual progress tracking with milestone celebrations.',
  },
  {
    icon: Users,
    title: '9 Specialized Agents',
    description: 'Different AI personas for planning, motivation, and coaching.',
  },
  {
    icon: Clock,
    title: 'Context Awareness',
    description: 'Remembers conversations and adapts recommendations.',
  },
  {
    icon: Sparkles,
    title: 'Smart Suggestions',
    description: 'Proactive task suggestions based on patterns.',
  },
]

const challenges = [
  {
    challenge: 'Managing Complex AI Conversation State',
    solution: 'Implemented multi-phase conversation system with state machines for seamless context switching.',
  },
  {
    challenge: 'Real-time Updates Across Components',
    solution: 'Built custom subscription system using Supabase realtime with React context.',
  },
  {
    challenge: 'Scaling AI Costs',
    solution: 'Designed tiered caching strategy, reducing API calls by 60% while maintaining quality.',
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

export default function TaskRiteCaseStudy() {
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

          {/* Profile - separate from back button on desktop */}
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />
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
              <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 blur-[80px]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-400">Live Project</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">TaskRite</h1>
                <p className="text-xl text-white/60 max-w-xl leading-relaxed mb-6">
                  AI-powered task management that transforms complex goals into actionable steps through intelligent conversation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://trytaskrite.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.4)] transition-shadow"
                  >
                    Visit Live Site
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Metrics Cards */}
            <motion.div variants={cardVariants} className="md:col-span-4 grid grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="glass rounded-2xl p-4 flex flex-col items-center justify-center text-center"
                >
                  <metric.icon className="w-6 h-6 text-red-500 mb-2" />
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                  <div className="text-[10px] text-white/40 uppercase tracking-wide">{metric.label}</div>
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
                    key={tech.name}
                    className="px-3 py-1.5 rounded-full text-sm bg-white/5 text-white/70 border border-white/10"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Problem Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="md:col-span-6 glass rounded-3xl p-6 bg-gradient-to-br from-red-600/10 to-transparent"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs mb-4">
                The Problem
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Task Management is Broken</h3>
              <p className="text-sm text-white/50">
                Traditional task managers are glorified lists. They don&apos;t help you figure out <em>how</em> to accomplish complex goals.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section - Bento Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Key <span className="text-gradient">Capabilities</span>
            </h2>
          </SafeInView>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {features.map((feature, index) => (
              <SafeInView
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className={`glass rounded-3xl p-6 ${index === 0 ? 'md:col-span-6' : 'md:col-span-6'}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.description}</p>
              </SafeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section - Bento Grid */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">Architecture</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              System <span className="text-gradient">Design</span>
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
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Frontend Layer</h3>
              <ul className="space-y-2 text-sm text-white/50">
                <li>Next.js 15 App Router</li>
                <li>Server & Client Components</li>
                <li>Framer Motion Animations</li>
                <li>Real-time UI Updates</li>
              </ul>
            </SafeInView>

            <SafeInView
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="glass rounded-3xl p-6 bg-gradient-to-br from-red-600/10 to-transparent"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">AI Layer</h3>
              <ul className="space-y-2 text-sm text-white/50">
                <li>Claude AI Integration</li>
                <li>9 Specialized Agents</li>
                <li>Multi-phase Conversations</li>
                <li>Response Caching</li>
              </ul>
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
              <h3 className="text-lg font-semibold text-white mb-3">Backend Layer</h3>
              <ul className="space-y-2 text-sm text-white/50">
                <li>Supabase PostgreSQL</li>
                <li>Row Level Security</li>
                <li>Edge Functions</li>
                <li>Real-time Subscriptions</li>
              </ul>
            </SafeInView>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">Challenges</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Problems <span className="text-gradient">Solved</span>
            </h2>
          </SafeInView>

          <div className="grid grid-cols-1 gap-4">
            {challenges.map((item, index) => (
              <SafeInView
                key={item.challenge}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs mb-3">
                      Challenge
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.challenge}</h3>
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs mb-3">
                      Solution
                    </div>
                    <p className="text-white/60 text-sm">{item.solution}</p>
                  </div>
                </div>
              </SafeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-950/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">Results</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Key <span className="text-gradient">Achievements</span>
            </h2>
          </SafeInView>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <SafeInView
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="md:col-span-8 glass rounded-3xl p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Technical Achievements</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">27 DB Migrations</div>
                    <div className="text-sm text-white/50">Mature, evolving schema</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">9 AI Agents</div>
                    <div className="text-sm text-white/50">Specialized coaching</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">60% Cost Reduction</div>
                    <div className="text-sm text-white/50">Through smart caching</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">100% TypeScript</div>
                    <div className="text-sm text-white/50">Full type safety</div>
                  </div>
                </div>
              </div>
            </SafeInView>

            <SafeInView
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="md:col-span-4 glass rounded-3xl p-6 bg-gradient-to-br from-red-600/10 to-transparent"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Key Learnings</h3>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Multi-phase conversation design is crucial
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Early DB architecture investment pays off
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  Specialized agents outperform generic ones
                </li>
              </ul>
            </SafeInView>
          </div>
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
            <div className="absolute top-0 right-0 w-60 h-60 bg-red-600/20 blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">
                Interested in Something Similar?
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                I build AI-powered applications that solve real problems. Let&apos;s discuss your project.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://trytaskrite.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.4)] transition-shadow"
                >
                  Try TaskRite
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
            ← Back to Portfolio
          </Link>
          <div className="text-white/30 text-sm">
            © 2026 Ibrahim Lawal. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
