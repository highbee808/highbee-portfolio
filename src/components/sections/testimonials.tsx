'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, Star } from 'lucide-react'
import { SafeMotionDiv } from '@/lib/motion'
import { ShimmerText } from '@/components/ui/shimmer-text'

const testimonials = [
  {
    name: 'Alex Chen',
    role: 'CTO at TechStart',
    initials: 'AC',
    quote: 'Ibrahim delivered our MVP in record time. His AI integration expertise transformed our product from a simple tool into an intelligent platform that our users love. The attention to UX and performance was exceptional.',
    featured: true,
  },
  {
    name: 'Sarah Johnson',
    role: 'Founder, CreativeFlow',
    initials: 'SJ',
    quote: 'Working with Ibrahim was seamless. He understood our vision immediately and built exactly what we needed. Communication was clear throughout the entire project.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Michael Okonkwo',
    role: 'Product Manager, FinBank',
    initials: 'MO',
    quote: 'The attention to detail and code quality exceeded our expectations. Highly recommend for any serious project that requires both technical skill and creative thinking.',
    gradient: 'from-emerald-500 to-emerald-600',
  },
]

const stats = [
  { value: '100%', label: 'Satisfaction' },
  { value: '15+', label: 'Projects' },
  { value: '5.0', label: 'Rating', hasStars: true },
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

export function Testimonials() {
  const featured = testimonials.find((t) => t.featured)
  const others = testimonials.filter((t) => !t.featured)

  return (
    <section id="testimonials" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Ambient glows */}
      <div className="absolute top-[-10%] left-[-15%] w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[150px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-zinc-500/[0.06] blur-[150px]" />

      <SafeMotionDiv
        variants={containerVariants}
        viewport={{ once: true, margin: '0px' }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Header Card */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-5 glass rounded-3xl p-8 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-px bg-gradient-to-r from-red-500 to-transparent" />
              <span className="text-xs font-medium text-red-500 uppercase tracking-wider">
                Testimonials
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              What Clients
              <br />
              <ShimmerText className="text-gradient">Say About Me</ShimmerText>
            </h2>
          </motion.div>

          {/* Featured Testimonial */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.3 } }}
            className="md:col-span-7 md:row-span-2 glass rounded-3xl p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-red-600/[0.08] to-transparent"
          >
            {/* Large quote mark */}
            <div className="absolute top-[-20px] left-[20px] font-serif text-[200px] leading-none text-red-500 opacity-[0.15] pointer-events-none select-none">
              &ldquo;
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <p className="font-serif text-lg md:text-xl italic text-white/90 leading-relaxed mb-8 flex-grow">
                {featured?.quote}
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14">
                  {/* Spinning ring */}
                  <div className="absolute inset-[-3px] rounded-full bg-gradient-conic animate-spin-slow" />
                  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-semibold text-lg">
                    {featured?.initials}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{featured?.name}</h4>
                  <p className="text-sm text-white/50">{featured?.role}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-5 glass rounded-3xl p-6"
          >
            <div className="grid grid-cols-3 gap-2 h-full">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] transition-colors text-center"
                >
                  {stat.hasStars && (
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-500 text-amber-500"
                        />
                      ))}
                    </div>
                  )}
                  <span className="font-serif text-2xl md:text-3xl text-white">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Testimonials */}
          {others.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="md:col-span-4 glass rounded-3xl p-6 flex flex-col"
            >
              <div className="font-serif text-5xl text-red-500/40 leading-none mb-2">
                &ldquo;
              </div>
              <p className="text-[15px] text-white/70 leading-relaxed mb-6 flex-grow">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-semibold text-sm`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <h5 className="font-semibold text-sm text-white">
                    {testimonial.name}
                  </h5>
                  <p className="text-xs text-white/50">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-4 glass rounded-3xl p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/[0.03] to-red-600/[0.05] hover:border-red-500/30 transition-colors cursor-pointer"
          >
            <Link href="#contact" className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mb-4 shadow-[0_4px_20px_rgba(220,38,38,0.3)]">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">Work With Me</h3>
              <p className="text-sm text-white/40">Let&apos;s build something great</p>
            </Link>
          </motion.div>
        </div>
      </SafeMotionDiv>
    </section>
  )
}
