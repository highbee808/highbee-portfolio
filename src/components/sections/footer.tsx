'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/highbee808',
    color: 'hover:text-white',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/highbee',
    color: 'hover:text-blue-400',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://x.com/Highbee_Realest',
    color: 'hover:text-sky-400',
  },
]

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
]

const serviceLinks = [
  { name: 'AI Integration', href: '/services/ai-integration' },
  { name: 'Claude AI Integration', href: '/services/claude-ai-integration' },
  { name: 'Next.js Developer Nigeria', href: '/services/nextjs-developer-nigeria' },
  { name: 'MVP Development', href: '/services/mvp-development' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/50 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Three columns on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/profile-favicon.png"
                alt="Highbee"
                width={40}
                height={40}
                className="rounded-full"
              />
              <h3 className="text-2xl font-bold text-white">
                High<span className="text-gradient">bee</span>
              </h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Full-Stack Developer & AI Integration Specialist. Building the future,
              one line of code at a time.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-colors ${link.color}`}
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium text-white/70 uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-8 text-sm font-medium text-white/70 uppercase tracking-wider mb-4">
              Service Pages
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-white/70 uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:hello@highbee.dev"
                  className="text-white/50 hover:text-slate-300 transition-colors"
                >
                  hello@highbee.dev
                </a>
              </li>
              <li className="text-white/50">Lagos, Nigeria</li>
              <li>
                <span className="inline-flex items-center gap-2 text-emerald-400 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for projects
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-center">
          <p className="text-sm text-white/40">
            © {currentYear} Highbee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
