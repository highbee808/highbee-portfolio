'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Bot, Code, Rocket, ArrowRight, Check, MessageSquare, ShieldCheck } from 'lucide-react'
import { SafeMotionDiv } from '@/lib/motion'
import { ShimmerText } from '@/components/ui/shimmer-text'

const services = [
  {
    id: 'ai',
    icon: Bot,
    title: 'AI Integration',
    price: '$500',
    features: [
      'Claude AI & ChatGPT integration',
      'Custom chatbots & assistants',
      'Workflow automation',
    ],
    href: '/services/ai-integration',
    secondaryHref: '/services/claude-ai-integration',
    popular: false,
  },
  {
    id: 'fullstack',
    icon: Code,
    title: 'Full-Stack Development',
    price: '$1,000',
    features: [
      'Next.js & React applications',
      'Database design & setup',
      'API development',
      'Authentication systems',
      'Cloud deployment',
      'Ongoing support available',
    ],
    href: '/services/nextjs-developer-nigeria',
    popular: true,
  },
  {
    id: 'prototype',
    icon: Rocket,
    title: 'Rapid Prototyping',
    price: '$1,500',
    features: [
      '2-4 week delivery',
      'Full design & development',
      'Scalable architecture',
    ],
    href: '/services/mvp-development',
    popular: false,
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

export function Services() {
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Ambient glow */}
      <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-red-600/[0.08] blur-[150px]" />
      <div className="absolute bottom-[20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-zinc-500/[0.06] blur-[150px]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

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
            className="md:col-span-8 glass rounded-3xl p-8 flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">
                Services & Pricing
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              What I Can Build
              <br />
              <ShimmerText className="text-gradient">For You</ShimmerText>
            </h2>
            <p className="text-lg text-white/40 max-w-md">
              From AI integrations to full-stack applications, I deliver solutions that work. Clear pricing, no surprises.
            </p>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-4 glass rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-red-600/[0.08] to-transparent"
          >
            <ShieldCheck className="w-12 h-12 text-red-500 mb-4" />
            <span className="text-xl font-semibold text-white mb-2">Transparent Pricing</span>
            <span className="text-sm text-white/40">No hidden fees or surprises</span>
          </motion.div>

          {/* AI Integration Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-4 glass rounded-3xl p-6 flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center mb-6">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">AI Integration</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <ShimmerText className="text-3xl font-bold text-gradient">$500</ShimmerText>
              <span className="text-lg text-white/40">+</span>
            </div>
            <span className="text-xs text-white/40 mb-5">Starting price</span>
            <ul className="space-y-3 flex-grow">
              {services[0].features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">{feature}</span>
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
              className="mt-6 w-full py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <Link
              href={services[0].href}
              className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-medium text-red-400 hover:text-red-300"
            >
              Learn more
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/services/claude-ai-integration"
              className="mt-2 inline-flex items-center justify-center text-xs font-medium text-white/40 hover:text-white/70"
            >
              Need Claude AI specifically?
            </Link>
          </motion.div>

          {/* Full-Stack Development Card (Featured) */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-5 md:row-span-2 glass rounded-3xl p-8 flex flex-col relative overflow-hidden bg-gradient-to-br from-red-600/[0.12] to-red-600/[0.03] border-red-500/25 shadow-[0_0_60px_rgba(220,38,38,0.15)] hover:border-red-500/40"
          >
            {/* Popular Badge */}
            <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-semibold uppercase tracking-wide shadow-[0_4px_20px_rgba(220,38,38,0.4)]">
              Most Popular
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-6 shadow-[0_8px_32px_rgba(220,38,38,0.3)]">
              <Code className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Full-Stack Development</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <ShimmerText className="text-3xl font-bold text-gradient">$1,000</ShimmerText>
              <span className="text-lg text-white/40">+</span>
            </div>
            <span className="text-xs text-white/40 mb-5">Starting price</span>
            <ul className="space-y-3 flex-grow">
              {services[1].features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">{feature}</span>
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
              className="mt-6 w-full py-3.5 px-6 rounded-xl font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-[0_4px_24px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_32px_rgba(220,38,38,0.4)] transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <Link
              href={services[1].href}
              className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-medium text-red-400 hover:text-red-300"
            >
              Learn more
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* Rapid Prototyping Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-4 glass rounded-3xl p-6 flex flex-col"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center mb-6">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Rapid Prototyping</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <ShimmerText className="text-3xl font-bold text-gradient">$1,500</ShimmerText>
              <span className="text-lg text-white/40">+</span>
            </div>
            <span className="text-xs text-white/40 mb-5">Starting price</span>
            <ul className="space-y-3 flex-grow">
              {services[2].features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70">{feature}</span>
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToContact}
              className="mt-6 w-full py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <Link
              href={services[2].href}
              className="mt-3 inline-flex items-center justify-center gap-2 text-sm font-medium text-red-400 hover:text-red-300"
            >
              Learn more
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            onClick={scrollToContact}
            className="md:col-span-3 glass rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-gradient-to-br from-white/[0.03] to-red-600/[0.05] hover:from-white/[0.05] hover:to-red-600/[0.1] transition-all"
          >
            <MessageSquare className="w-12 h-12 text-red-500 mb-4" />
            <span className="text-lg font-semibold text-white mb-2">Custom Project?</span>
            <span className="text-sm text-white/40 mb-4">Let&apos;s discuss your unique needs</span>
            <span className="inline-flex items-center gap-2 text-red-500 font-medium text-sm group">
              Get in touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.div>
        </div>
      </SafeMotionDiv>
    </section>
  )
}
