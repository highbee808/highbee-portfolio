'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ParticleBackground } from '@/components/animations/particle-background'
import { TypingAnimation } from '@/components/animations/typing-animation'
import { MessageCircle, Code2, Braces, Terminal, Download } from 'lucide-react'

const phrases = ['AI Integration', 'Full-Stack Apps', 'Rapid Prototyping']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

// Floating decorative elements
const floatingElements = [
  { Icon: Code2, top: '15%', left: '8%', delay: 0, size: 24 },
  { Icon: Braces, top: '25%', right: '10%', delay: 0.5, size: 20 },
  { Icon: Terminal, bottom: '30%', left: '5%', delay: 1, size: 22 },
  { Icon: Code2, bottom: '20%', right: '8%', delay: 1.5, size: 18 },
]

export function Hero() {
  const [useLightEffects, setUseLightEffects] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setUseLightEffects(reduceMotion)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered backgrounds */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Static gradient orbs - no animation for better performance */}
      <div className="performance-orbs absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-red-900/20 blur-[80px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-zinc-700/20 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-red-600/10 blur-[60px]" />
      </div>

      {/* Static decorative code icons */}
      {floatingElements.map((el, index) => (
        <div
          key={index}
          className="absolute hidden lg:block text-red-500/20"
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            bottom: el.bottom,
          }}
        >
          <el.Icon size={el.size} strokeWidth={1.5} />
        </div>
      ))}

      {/* Scanline overlay for retro-tech feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.1) 2px,
            rgba(255, 255, 255, 0.1) 4px
          )`,
        }}
      />

      {/* Grid pattern - red tinted */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Particles */}
      <ParticleBackground />

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Status badge with glow */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 hover:border-emerald-500/30 transition-colors duration-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-sm text-white/70">Available for new projects</span>
          </motion.div>
        </motion.div>

        {/* Main headline with shimmer effect */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
        >
          <span className="text-white">I Build </span>
          <motion.span
            className="inline-block bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #a1a1aa 75%, #ffffff 100%)',
              backgroundSize: '200% 100%',
            }}
            animate={useLightEffects ? undefined : {
              backgroundPosition: ['0% 0%', '-100% 0%'],
            }}
            transition={useLightEffects ? undefined : {
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            AI-Powered
          </motion.span>
          <span className="text-white"> Products</span>
          <br />
          <span className="text-white">That </span>
          <span className="relative inline-block">
            <motion.span
              className="text-white"
              animate={useLightEffects ? undefined : {
                textShadow: [
                  '0 0 20px rgba(220, 38, 38, 0)',
                  '0 0 20px rgba(220, 38, 38, 0.3)',
                  '0 0 20px rgba(220, 38, 38, 0)',
                ],
              }}
              transition={useLightEffects ? undefined : { duration: 3, repeat: Infinity }}
            >
              Solve
            </motion.span>
            <svg
              className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                d="M2 8C50 2 150 2 198 8"
                stroke="url(#underline-gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
              />
              <defs>
                <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                  <stop stopColor="#dc2626" />
                  <stop offset="1" stopColor="#991b1b" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="text-white"> Real Problems</span>
        </motion.h1>

        {/* Typing animation tagline */}
        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl text-white/60 mb-4"
        >
          Specializing in{' '}
          <TypingAnimation phrases={phrases} className="font-semibold text-red-400" />
        </motion.div>

        {/* Subtitle with name - animated separators */}
        <motion.div
          variants={itemVariants}
          className="text-base sm:text-lg text-white/50 mb-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2"
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-red-500/50">
              <Image
                src="/images/profile-cartoon.png"
                alt="Ibrahim Lawal"
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <span className="font-medium text-red-500">Ibrahim Lawal</span>
          </motion.div>
          <motion.span
            className="hidden sm:inline text-white/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            |
          </motion.span>
          <span>Full-Stack Developer</span>
          <motion.span
            className="hidden sm:inline text-white/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            |
          </motion.span>
          <span>AI Integration Specialist</span>
          <motion.span
            className="hidden sm:inline text-white/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            |
          </motion.span>
          <span>Next.js Expert</span>
        </motion.div>

        {/* CTA Buttons with enhanced effects */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: '0 0 50px rgba(220, 38, 38, 0.5)',
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('projects')}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full font-semibold text-white text-sm sm:text-base overflow-hidden transition-all duration-300"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700"
              animate={useLightEffects ? undefined : {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={useLightEffects ? undefined : { duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 200%' }}
            />
            <span className="relative z-10 flex items-center gap-2">
              See My Work
              <motion.span
                animate={useLightEffects ? undefined : { x: [0, 5, 0] }}
                transition={useLightEffects ? undefined : { duration: 1.2, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollToSection('contact')}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-white text-sm sm:text-base border border-white/20 bg-white/5 backdrop-blur-sm blur-fix transition-all duration-300 hover:border-red-500/50 hover:bg-red-600/10"
          >
            Let&apos;s Talk
          </motion.button>

          <motion.a
            href="/resume"
            whileHover={{
              scale: 1.03,
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
            whileTap={{ scale: 0.97 }}
            className="hidden sm:inline-flex items-center gap-2 px-6 py-3 sm:py-4 rounded-full font-semibold text-white/70 text-sm sm:text-base border border-white/10 bg-white/[0.02] backdrop-blur-sm blur-fix transition-all duration-300 hover:text-white"
          >
            <Download className="w-4 h-4" />
            Resume
          </motion.a>
        </motion.div>

        {/* Tech stack with staggered animation */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-white/30"
        >
          <span className="text-xs uppercase tracking-wider">Built with</span>
          <div className="flex items-center gap-4">
            {['nextjs', 'typescript', 'react', 'tailwindcss'].map((tech, index) => (
              <motion.i
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.4 }}
                whileHover={{
                  scale: 1.3,
                  color: 'rgba(220, 38, 38, 0.8)',
                  rotate: [0, -10, 10, 0],
                }}
                className={`devicon-${tech === 'nextjs' ? 'nextjs-plain' : tech + '-plain'} text-2xl transition-colors cursor-pointer`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Floating AI Chat hint - simplified */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="safari-hide fixed bottom-24 right-6 z-50 hidden md:block"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl glass border border-white/10 cursor-pointer group hover:border-red-500/30 transition-all duration-300">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.3)]">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
              Ask me anything
            </p>
            <p className="text-xs text-white/50">AI-powered assistant</p>
          </div>
          <span className="text-white/50 group-hover:text-red-400 transition-colors">
            →
          </span>
        </div>
      </motion.div>
    </section>
  )
}
