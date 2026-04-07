'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ExternalLink,
  Home,
  Users,
  CreditCard,
  Bell,
  MessageSquare,
  Wrench,
  Smartphone,
  Receipt,
  Link2,
  Lock,
  Zap,
  CheckCircle2,
  Building2,
  Globe,
  FileText,
} from 'lucide-react'
import { SafeInView } from '@/lib/motion'

const stats = [
  { icon: Users, value: '500+', label: 'Beta Users' },
  { icon: Smartphone, value: 'PWA', label: 'Installable' },
  { icon: Globe, value: 'Nigeria', label: 'Target Market' },
  { icon: Zap, value: 'SSR', label: 'Fast Loading' },
]

const features = [
  { icon: Receipt, title: 'Digital Receipts', description: 'Generate and share via WhatsApp instantly.' },
  { icon: CreditCard, title: 'Payment Tracking', description: 'Record, verify, and track all rent payments.' },
  { icon: MessageSquare, title: 'In-App Messaging', description: 'Direct landlord-tenant communication.' },
  { icon: Link2, title: 'Payment Links', description: 'Paystack integration for online collection.' },
  { icon: Bell, title: 'SMS Reminders', description: 'Automated due date reminders via Termii.' },
  { icon: Home, title: 'Property Management', description: 'Manage properties, units, and tenants.' },
  { icon: Wrench, title: 'Maintenance Requests', description: 'Submit and track maintenance issues.' },
  { icon: Lock, title: 'Privacy Controls', description: 'Control what information is visible.' },
  { icon: Smartphone, title: 'PWA Support', description: 'Works offline for Nigerian connectivity.' },
]

const techStack = [
  'Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'Paystack', 'Termii SMS'
]

const challenges = [
  {
    challenge: 'Slow Landing Page Load',
    solution: 'Converted to server components, extracted only interactive parts as client components.',
  },
  {
    challenge: 'Naira Symbol Rendering',
    solution: 'Added Noto Sans font specifically for proper ₦ currency display across all devices.',
  },
  {
    challenge: 'Mobile Navigation Space',
    solution: 'Implemented role-specific bottom navigation for landlords vs tenants.',
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

export default function RentRightCaseStudy() {
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-emerald-600/10 blur-[150px]" />
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
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-600/20 blur-[80px]" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-6">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm text-emerald-400">Live Project</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">RentRight</h1>
                <p className="text-xl text-emerald-400 font-medium mb-4">&ldquo;Never Argue About Rent Again&rdquo;</p>
                <p className="text-lg text-white/60 max-w-xl leading-relaxed mb-6">
                  A mobile-first property management PWA that digitizes the landlord-tenant relationship in Nigeria.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://rentrightng.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_28px_rgba(16,185,129,0.4)] transition-shadow"
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
                  <stat.icon className="w-6 h-6 text-emerald-500 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
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

            {/* Problem Card */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="md:col-span-6 glass rounded-3xl p-6 bg-gradient-to-br from-red-600/10 to-transparent"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs mb-4">
                The Problem
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Rent Disputes Are Common</h3>
              <p className="text-sm text-white/50">
                Poor documentation and communication between landlords and tenants in Nigeria leads to constant arguments.
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
              <div className="w-10 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">Features</span>
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50">{feature.description}</p>
              </SafeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Two-Sided Platform Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">Platform</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Two-Sided <span className="text-gradient">Experience</span>
            </h2>
          </SafeInView>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Landlord Card */}
            <SafeInView
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Landlord</h3>
                  <p className="text-sm text-white/50">Dashboard</p>
                </div>
              </div>
              <ul className="space-y-3">
                {['Revenue overview with stats', 'Properties management (CRUD)', 'Payment recording and history', 'Tenant management', 'Handle maintenance requests', 'SMS reminder settings'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </SafeInView>

            {/* Tenant Card */}
            <SafeInView
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Tenant</h3>
                  <p className="text-sm text-white/50">Dashboard</p>
                </div>
              </div>
              <ul className="space-y-3">
                {['Rent status overview', 'Complete payment history', 'Submit maintenance requests', 'Track request status', 'Message landlord directly', 'Download receipts'].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </SafeInView>
          </div>
        </div>
      </section>

      {/* Design for Nigeria Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">Design</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Built for <span className="text-gradient">Nigeria</span>
            </h2>
          </SafeInView>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Smartphone, title: 'Mobile-First', description: 'Optimized for mobile users' },
              { icon: Globe, title: 'Nigerian Green', description: 'Uses #008751 brand color' },
              { icon: FileText, title: 'Naira Support', description: 'Proper ₦ rendering' },
              { icon: Zap, title: 'Offline-Ready', description: 'PWA for poor connectivity' },
            ].map((item, index) => (
              <SafeInView
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-6 text-center"
              >
                <item.icon className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-white/50">{item.description}</p>
              </SafeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">Challenges</span>
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
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SafeInView
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
              <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">Results</span>
            </div>
            <h2 className="text-4xl font-bold text-white">
              Key <span className="text-gradient">Outcomes</span>
            </h2>
          </SafeInView>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '500+', label: 'Beta Users', description: 'Active during testing' },
              { value: 'PWA', label: 'Mobile App', description: 'No app store needed' },
              { value: 'SSR', label: 'Fast Loads', description: 'Server-side rendering' },
              { value: '$0', label: 'Beta Cost', description: 'Scalable infrastructure' },
            ].map((item, index) => (
              <SafeInView
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="glass rounded-3xl p-6 text-center"
              >
                <div className="text-3xl font-bold text-gradient mb-2">{item.value}</div>
                <div className="text-white font-medium mb-1">{item.label}</div>
                <div className="text-xs text-white/50">{item.description}</div>
              </SafeInView>
            ))}
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
            <div className="absolute top-0 right-0 w-60 h-60 bg-emerald-600/20 blur-[100px]" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-white mb-4">
                Check Out RentRight Live
              </h2>
              <p className="text-white/50 mb-8 max-w-xl mx-auto">
                See how we&apos;re solving rent disputes for Nigerian landlords and tenants.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://rentrightng.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-medium shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_28px_rgba(16,185,129,0.4)] transition-shadow"
                >
                  Visit RentRight
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
