'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const roles = ['Full-Stack Developer', 'AI Integration Specialist']

export function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling past 80% of viewport height
      const scrollThreshold = window.innerHeight * 0.8
      setIsVisible(window.scrollY > scrollThreshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Rotate through roles every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between">
            {/* Left side - Identity pill */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 px-3 py-2 pr-5 rounded-full border border-white/10 pointer-events-auto hover:border-white/20 transition-colors duration-300 group backdrop-blur-2xl bg-black/40"
            >
              {/* Avatar with pulse ring */}
              <div className="relative flex-shrink-0">
                {/* Pulse ring */}
                <div className="absolute inset-[-3px] rounded-full bg-gradient-to-br from-red-600 to-red-800 opacity-60 animate-pulse-ring" />

                {/* Avatar container */}
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#1a1a24] to-[#2a2a3a] border-2 border-[#0a0a0f] overflow-hidden">
                  <Image
                    src="/images/profile-cartoon.png"
                    alt="Ibrahim Lawal"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Identity info */}
              <div className="flex flex-col min-w-[140px]">
                <span className="text-red-500 font-semibold text-sm leading-tight tracking-tight">
                  Ibrahim Lawal
                </span>
                <div className="h-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/50 text-xs font-mono block"
                    >
                      {roles[roleIndex]}
                      <span className="inline-block w-[2px] h-3 bg-red-500/70 ml-0.5 animate-cursor-blink" />
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Status indicator */}
              <div
                className="w-2 h-2 rounded-full bg-emerald-500 ml-1 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                title="Available for projects"
              />
            </motion.div>

            {/* Right side - Quick nav (optional, hidden on mobile) */}
            <motion.nav
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex items-center gap-2 pointer-events-auto"
            >
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#about">About</NavLink>
              <NavLink href="#contact" primary>
                Contact
              </NavLink>
            </motion.nav>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}

function NavLink({
  href,
  children,
  primary = false,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (primary) {
    return (
      <motion.a
        href={href}
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-full hover:shadow-lg hover:shadow-red-500/25 transition-shadow"
      >
        {children}
      </motion.a>
    )
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white/90 rounded-full hover:bg-white/5 transition-all"
    >
      {children}
    </a>
  )
}
