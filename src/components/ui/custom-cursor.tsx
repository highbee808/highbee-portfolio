'use client'

import { useEffect, useState, useRef } from 'react'

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true) // Default to true to prevent flash
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Check if touch device
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)

    if (window.matchMedia('(pointer: coarse)').matches) return

    const updatePosition = () => {
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x - 8}px, ${posRef.current.y - 8}px)`
        ringRef.current.style.transform = `translate(${posRef.current.x - 20}px, ${posRef.current.y - 20}px)`
      }
      rafRef.current = requestAnimationFrame(updatePosition)
    }

    const moveCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => setIsHovering(false)
    const handleMouseLeave = () => setIsVisible(false)

    rafRef.current = requestAnimationFrame(updatePosition)

    window.addEventListener('mousemove', moveCursor, { passive: true })
    document.addEventListener('mouseover', handleHoverStart, { passive: true })
    document.addEventListener('mouseout', handleHoverEnd, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isVisible])

  if (isTouchDevice) return null

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-transform duration-75"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div
          className="w-4 h-4 rounded-full bg-white transition-transform duration-150"
          style={{ transform: isHovering ? 'scale(1.5)' : 'scale(1)' }}
        />
      </div>

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-transform duration-150"
        style={{ opacity: isVisible ? 0.4 : 0 }}
      >
        <div
          className="w-10 h-10 rounded-full border border-white/40 transition-transform duration-200"
          style={{ transform: isHovering ? 'scale(1.8)' : 'scale(1)' }}
        />
      </div>

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  )
}
