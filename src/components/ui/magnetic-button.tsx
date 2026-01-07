'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: 'button' | 'a' | 'div'
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as = 'button',
  href,
  target,
  rel,
  onClick,
  type = 'button',
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    setPosition({ x: distanceX, y: distanceY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Component = motion[as] as typeof motion.button

  const props = {
    ref: ref as React.Ref<HTMLButtonElement>,
    className: `magnetic-target ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring' as const, stiffness: 350, damping: 15 },
    ...(as === 'a' && { href, target, rel }),
    ...(as === 'button' && { type, disabled }),
  }

  return <Component {...props}>{children}</Component>
}
