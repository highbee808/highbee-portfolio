'use client'

import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
  pulseSpeed: number
  pulseOffset: number
}

const COLORS = [
  'rgba(220, 38, 38, 0.54)',   // red-600
  'rgba(161, 161, 170, 0.45)', // zinc-400
  'rgba(82, 82, 91, 0.45)',    // zinc-600
  'rgba(255, 255, 255, 0.36)', // white
]

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)

  const createParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.floor((width * height) / 15000)
    const particles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.5 + 0.8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.45 + 0.36,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      })
    }

    return particles
  }, [])

  const drawParticle = useCallback(
    (ctx: CanvasRenderingContext2D, particle: Particle, time: number) => {
      const pulse = Math.sin(time * particle.pulseSpeed + particle.pulseOffset)
      const currentAlpha = particle.alpha + pulse * 0.15
      const currentRadius = particle.radius + pulse * 0.3

      // Glow effect
      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        currentRadius * 4
      )
      gradient.addColorStop(0, particle.color.replace('0.8', String(currentAlpha)))
      gradient.addColorStop(0.4, particle.color.replace('0.8', String(currentAlpha * 0.4)))
      gradient.addColorStop(1, 'transparent')

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, currentRadius * 4, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Core
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color.replace('0.8', String(currentAlpha + 0.2))
      ctx.fill()
    },
    []
  )

  const drawConnections = useCallback(
    (ctx: CanvasRenderingContext2D, particles: Particle[], mouseX: number, mouseY: number) => {
      const connectionDistance = 120
      const mouseDistance = 200

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        // Mouse connection
        const dxMouse = mouseX - p1.x
        const dyMouse = mouseY - p1.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        if (distMouse < mouseDistance && mouseX > 0 && mouseY > 0) {
          const alphaMouse = (1 - distMouse / mouseDistance) * 0.4
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(mouseX, mouseY)
          ctx.strokeStyle = `rgba(220, 38, 38, ${alphaMouse})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p2.x - p1.x
          const dy = p2.y - p1.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.22
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)

            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y)
            gradient.addColorStop(0, `rgba(220, 38, 38, ${alpha})`)
            gradient.addColorStop(1, `rgba(82, 82, 91, ${alpha})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    },
    []
  )

  const animate = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      let time = 0

      const loop = () => {
        time++
        ctx.clearRect(0, 0, width, height)

        // Update and draw particles
        particlesRef.current.forEach((particle) => {
          particle.x += particle.vx
          particle.y += particle.vy

          // Boundary wrapping
          if (particle.x < 0) particle.x = width
          if (particle.x > width) particle.x = 0
          if (particle.y < 0) particle.y = height
          if (particle.y > height) particle.y = 0

          drawParticle(ctx, particle, time)
        })

        // Draw connections
        drawConnections(ctx, particlesRef.current, mouseRef.current.x, mouseRef.current.y)

        animationRef.current = requestAnimationFrame(loop)
      }

      loop()
    },
    [drawParticle, drawConnections]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)

      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      particlesRef.current = createParticles(rect.width, rect.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: 0, y: 0 }
    }

    handleResize()
    animate(ctx, canvas.offsetWidth, canvas.offsetHeight)

    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [createParticles, animate])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.77 }}
    />
  )
}
