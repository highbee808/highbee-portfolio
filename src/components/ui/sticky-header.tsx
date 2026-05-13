'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { BadgeCheck } from 'lucide-react'

const roles = ['Full-Stack Developer', 'AI Integration Specialist']

const menuLinks = [
  { name: 'Projects', href: '#projects', isExternal: false },
  { name: 'About', href: '#about', isExternal: false },
  { name: 'Services', href: '#services', isExternal: false },
  { name: 'Blog', href: '/blog', isExternal: true },
  { name: 'Resume', href: '/resume', isExternal: true },
  { name: 'Contact', href: '#contact', isExternal: false },
]

export function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  // Body scroll lock when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleMenuLinkClick = (href: string, isExternal: boolean) => {
    setIsMenuOpen(false)
    if (!isExternal) {
      const element = document.querySelector(href)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          key="sticky-header"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3 pointer-events-none gpu-boost"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between">
            {/* Left side - Identity pill */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 px-3 py-2 pr-5 rounded-full border border-white/10 pointer-events-auto hover:border-white/20 transition-colors duration-300 group backdrop-blur-2xl bg-black/40 blur-fix gpu-boost"
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
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Identity info - fixed width to prevent container resizing */}
              <div className="flex flex-col w-[170px]">
                <span className="text-red-500 font-semibold text-sm leading-tight tracking-tight flex items-center gap-1">
                  Ibrahim Lawal
                  <BadgeCheck className="w-4 h-4 text-emerald-500 fill-emerald-500/20" />
                </span>
                <div className="h-4 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-white/50 text-xs font-mono block whitespace-nowrap"
                    >
                      {roles[roleIndex]}
                      <span className="inline-block w-[2px] h-3 bg-red-500/70 ml-0.5 animate-cursor-blink" />
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Status indicator (desktop) - same size as mobile menu button */}
              <div
                className="hidden md:flex w-8 h-8 rounded-full bg-black border-2 border-red-500 ml-1 items-center justify-center"
                title="Available for projects"
              >
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>

              {/* Mobile menu button - same size as desktop indicator */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-8 h-8 rounded-full bg-white border-2 border-red-500 flex items-center justify-center ml-1 transition-transform active:scale-95"
                aria-label="Toggle menu"
              >
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <motion.span
                    animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
                    className="absolute w-3.5 h-0.5 bg-black rounded-full"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="absolute w-3.5 h-0.5 bg-black rounded-full"
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
                    className="absolute w-3.5 h-0.5 bg-black rounded-full"
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </button>
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

      {/* Full-screen mobile menu overlay */}
      {isMenuOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-[#0a0a0f] md:hidden"
        >
          <div className="flex flex-col items-center justify-center min-h-screen px-6">
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-center gap-6"
            >
              {menuLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                    delay: index * 0.04,
                  }}
                >
                  {link.isExternal ? (
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-3xl font-bold text-white/80 hover:text-red-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleMenuLinkClick(link.href, link.isExternal)}
                      className="text-3xl font-bold text-white/80 hover:text-red-500 transition-colors"
                    >
                      {link.name}
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.nav>

            {/* Social/availability indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-12 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm text-white/50">Available for projects</span>
            </motion.div>
          </div>
        </motion.div>
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
