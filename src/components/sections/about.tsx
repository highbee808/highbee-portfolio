'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, BadgeCheck } from 'lucide-react'

const techStack = [
  { name: 'Next.js', icon: 'devicon-nextjs-plain' },
  { name: 'React', icon: 'devicon-react-original' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain' },
  { name: 'Python', icon: 'devicon-python-plain' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
  { name: 'Supabase', icon: 'devicon-supabase-plain' },
  { name: 'Tailwind', icon: 'devicon-tailwindcss-original' },
]

const stats = [
  { value: '5+', label: 'Years Coding' },
  { value: '20+', label: 'Projects Built' },
  { value: '10+', label: 'AI Integrations' },
]

const currentProjects = [
  {
    name: 'TaskRite',
    description: 'AI-powered task management with 9 specialized agents',
    status: 'Live',
  },
  {
    name: 'RentRight',
    description: 'Property rental marketplace for Nigeria',
    status: 'Live',
  },
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

export function About() {
  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-zinc-500/10 blur-[120px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={cardVariants} className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-10 bg-gradient-to-r from-red-500 to-transparent" />
            <span className="text-red-500 text-sm font-medium tracking-wider uppercase">
              About Me
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            The Builder Behind
            <br />
            <span className="text-gradient">The Code</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Profile Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-5 md:row-span-2 glass rounded-3xl p-8 relative overflow-hidden group"
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/20 blur-[80px] group-hover:bg-red-600/30 transition-colors" />

            <div className="relative flex flex-col items-center text-center h-full justify-center py-4">
              {/* Avatar with spinning ring */}
              <div className="relative mb-6">
                <div className="absolute inset-[-4px] rounded-full bg-gradient-conic from-red-600 via-red-800 to-red-600 animate-spin-slow" />
                <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#1a1a24] to-[#2a2a3a] border-[3px] border-[#0a0a0f] overflow-hidden">
                  <Image
                    src="/images/profile-cartoon.png"
                    alt="Ibrahim Lawal"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                Ibrahim Lawal
                <BadgeCheck className="w-5 h-5 text-emerald-500 fill-emerald-500/20" />
              </h3>
              <p className="text-white/50 text-sm mb-4">Full-Stack Developer & AI Specialist</p>

              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 text-sm">Available for projects</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5 mt-4 text-white/30 text-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </motion.div>

          {/* Bio Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-7 glass rounded-3xl p-8 flex flex-col justify-center"
          >
            <p className="text-lg text-white/70 leading-relaxed">
              I&apos;m a builder who moves fast. I specialize in creating{' '}
              <span className="text-red-500 font-medium">AI-powered web applications</span>{' '}
              that solve real problems and deliver tangible value.
            </p>
            <p className="mt-4 pt-4 border-t border-white/10 text-white/30 text-sm italic">
              &ldquo;Ship fast, iterate quickly, build things people actually want to use.&rdquo;
            </p>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-7 glass rounded-3xl p-6"
          >
            <div className="grid grid-cols-3 gap-4 h-full">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl transition-colors"
                >
                  <span className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</span>
                  <span className="text-xs text-white/30 mt-1 uppercase tracking-wide">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-7 glass rounded-3xl p-6"
          >
            <h4 className="text-xs font-medium text-white/30 uppercase tracking-wider mb-5">
              Tech Stack
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all cursor-pointer"
                >
                  <i className={`${tech.icon} text-2xl text-white/50 hover:text-white transition-colors`} />
                  <span className="text-[10px] text-white/30 font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Currently Building Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-5 glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <h4 className="text-xs font-medium text-white/30 uppercase tracking-wider">
                Currently Building
              </h4>
            </div>
            <div className="space-y-3">
              {currentProjects.map((project) => (
                <motion.div
                  key={project.name}
                  whileHover={{ borderColor: 'rgba(220, 38, 38, 0.5)', backgroundColor: 'rgba(220, 38, 38, 0.05)' }}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 transition-all cursor-pointer"
                >
                  <h5 className="font-semibold text-white mb-1">{project.name}</h5>
                  <p className="text-sm text-white/50">{project.description}</p>
                  <span className="inline-block mt-2 px-2.5 py-1 text-[10px] bg-white/10 rounded-full text-white/50">
                    {project.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* AI Specialist Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="md:col-span-12 glass rounded-3xl p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-xl font-semibold text-white mb-2">AI Integration Specialist</h4>
                <p className="text-sm text-white/50 max-w-md">
                  Building intelligent features with leading AI models. From custom chatbots to
                  workflow automation, I bring AI capabilities to modern applications.
                </p>
              </div>
              <div className="flex gap-4">
                {/* Claude Logo */}
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
                  <Image
                    src="/images/claude logo PNG.png"
                    alt="Claude AI"
                    width={28}
                    height={28}
                  />
                  <span className="text-sm font-medium text-white/70">Claude</span>
                </div>
                {/* ChatGPT Logo */}
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none">
                    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10A37F"/>
                  </svg>
                  <span className="text-sm font-medium text-white/70">ChatGPT</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
