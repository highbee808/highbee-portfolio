'use client'

import { motion } from 'framer-motion'

interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
  duration?: number
}

export function ShimmerText({
  children,
  className = '',
  duration = 3
}: ShimmerTextProps) {
  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #a1a1aa 25%, #ffffff 50%, #a1a1aa 75%, #ffffff 100%)',
        backgroundSize: '200% 100%',
      }}
      animate={{
        backgroundPosition: ['0% 0%', '-100% 0%'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  )
}
