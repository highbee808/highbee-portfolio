'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number | null>(null)

  const createParticles = useCallback((width: number, height: number) => {
    // Reduced particle count - max 40 particles
    const particleCount = Math.min(40, Math.floor((width * height) / 50000))
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      })
    }

    return particles
  }, [])

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const loop = () => {
      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current

      // Draw particles - simple circles, no gradients
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary wrapping
        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0

        // Simple particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 38, 38, ${particle.alpha})`
        ctx.fill()
      })

      // Draw connections - only check nearby particles, limit connections
      const connectionDistance = 100
      let connectionCount = 0
      const maxConnections = 30

      for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
        const p1 = particles[i]
        for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
          const p2 = particles[j]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const distSq = dx * dx + dy * dy

          if (distSq < connectionDistance * connectionDistance) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / connectionDistance) * 0.1
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
            connectionCount++
          }
        }
      }

      animationRef.current = requestAnimationFrame(loop)
    }

    loop()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      particlesRef.current = createParticles(rect.width, rect.height)
    }

    handleResize()
    animate(ctx, canvas.offsetWidth, canvas.offsetHeight)

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [createParticles, animate])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  )
}
