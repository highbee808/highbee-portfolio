'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Mail, MapPin, Globe, Github, Linkedin, Download, ArrowLeft, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const skills = {
  'Frontend': ['React', 'Next.js 15/16', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  'Backend': ['Node.js', 'Supabase', 'PostgreSQL', 'REST APIs', 'tRPC'],
  'AI & Tools': ['Claude AI', 'OpenAI', 'Git', 'Vercel', 'Figma'],
}

const experience = [
  {
    title: 'Full-Stack Developer & AI Specialist',
    company: 'Freelance',
    period: '2023 - Present',
    description: 'Building AI-powered applications and full-stack web solutions for clients worldwide.',
    highlights: [
      'Developed TaskRite, an AI-powered task management platform with 9 specialized AI agents',
      'Built RentRight, a property rental marketplace serving 500+ beta users in Nigeria',
      'Integrated Claude AI into multiple client projects for intelligent automation',
      'Delivered 15+ projects with 100% client satisfaction',
    ],
  },
]

const projects = [
  {
    name: 'TaskRite',
    description: 'AI-powered task management platform with 9 specialized AI agents',
    tech: ['Next.js 15', 'TypeScript', 'Claude AI', 'Supabase'],
    link: 'https://trytaskrite.com',
    metrics: '27 DB migrations • 50+ components • 100% TypeScript',
  },
  {
    name: 'RentRight',
    description: 'Property rental marketplace for Nigeria with digital receipts and rent tracking',
    tech: ['Next.js 16', 'Supabase', 'Paystack', 'PWA'],
    link: 'https://rentrightng.vercel.app',
    metrics: '500+ beta users • Full PWA support',
  },
]

const education = [
  {
    degree: 'Self-Taught Developer',
    institution: 'Online Courses & Documentation',
    period: '2020 - Present',
    details: 'Continuous learning through official documentation, courses, and building real projects',
  },
]

export default function ResumePage() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <>
      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: #0a0a0f !important;
          }
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-inside: avoid;
          }
          @page {
            size: A4;
            margin: 0.5in;
          }
        }
      `}</style>

      <main className="min-h-screen bg-[#0a0a0f]">
        {/* Background - hidden on print */}
        <div className="fixed inset-0 pointer-events-none no-print">
          <div className="absolute top-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-600/10 blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-zinc-600/[0.06] blur-[150px]" />
        </div>

        {/* Nav - hidden on print */}
        <nav className="relative z-10 px-6 py-4 no-print">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back Home</span>
            </Link>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Save as PDF
            </button>
          </div>
        </nav>

        {/* Resume Content */}
        <div className="relative z-10 px-6 py-8 print:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <header className="glass rounded-3xl p-8 mb-6 print:bg-white/[0.03] print:rounded-2xl print-break">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Image */}
                <div className="relative">
                  <div className="absolute inset-[-4px] rounded-full bg-gradient-conic animate-spin-slow print:animate-none" />
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#0a0a0f]">
                    <Image
                      src="/images/profile-cartoon.png"
                      alt="Ibrahim Lawal"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Name & Title */}
                <div className="flex-grow">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    Ibrahim Lawal
                  </h1>
                  <p className="text-xl text-red-500 font-medium mb-3">
                    Full-Stack Developer & AI Integration Specialist
                  </p>
                  <p className="text-white/60 max-w-xl">
                    Building AI-powered applications that solve real problems. Specializing in Next.js, TypeScript, and Claude AI integration.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col gap-2 text-sm">
                  <a href="mailto:hello@highbee.dev" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-red-500" />
                    hello@highbee.dev
                  </a>
                  <a href="https://highbee.dev" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                    <Globe className="w-4 h-4 text-red-500" />
                    highbee.dev
                  </a>
                  <span className="flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4 text-red-500" />
                    Nigeria
                  </span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - Skills */}
              <div className="md:col-span-1 space-y-6">
                {/* Skills */}
                <section className="glass rounded-3xl p-6 print:bg-white/[0.03] print:rounded-2xl print-break">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    Skills
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(skills).map(([category, items]) => (
                      <div key={category}>
                        <h3 className="text-xs font-medium text-red-500 uppercase tracking-wider mb-2">
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {items.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 text-xs rounded-md bg-white/[0.05] text-white/70 border border-white/10"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section className="glass rounded-3xl p-6 print:bg-white/[0.03] print:rounded-2xl print-break">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    Education
                  </h2>
                  {education.map((edu) => (
                    <div key={edu.degree}>
                      <h3 className="font-medium text-white">{edu.degree}</h3>
                      <p className="text-sm text-white/50">{edu.institution}</p>
                      <p className="text-xs text-red-500 mt-1">{edu.period}</p>
                      <p className="text-xs text-white/40 mt-2">{edu.details}</p>
                    </div>
                  ))}
                </section>

                {/* Links */}
                <section className="glass rounded-3xl p-6 print:bg-white/[0.03] print:rounded-2xl print-break">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    Links
                  </h2>
                  <div className="space-y-3">
                    <a
                      href="https://github.com/highbee808"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm">github.com/highbee808</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/highbee"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm">linkedin.com/in/highbee</span>
                    </a>
                  </div>
                </section>
              </div>

              {/* Right Column - Experience & Projects */}
              <div className="md:col-span-2 space-y-6">
                {/* Experience */}
                <section className="glass rounded-3xl p-6 print:bg-white/[0.03] print:rounded-2xl print-break">
                  <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    Experience
                  </h2>
                  {experience.map((exp) => (
                    <div key={exp.title} className="mb-6 last:mb-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-white">{exp.title}</h3>
                          <p className="text-sm text-red-500">{exp.company}</p>
                        </div>
                        <span className="text-xs text-white/40 bg-white/[0.05] px-3 py-1 rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-white/60 mb-3">{exp.description}</p>
                      <ul className="space-y-1.5">
                        {exp.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-white/50 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                {/* Projects */}
                <section className="glass rounded-3xl p-6 print:bg-white/[0.03] print:rounded-2xl print-break">
                  <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    Featured Projects
                  </h2>
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <div key={project.name} className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold text-white">{project.name}</h3>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-500 hover:text-red-400 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        <p className="text-sm text-white/60 mb-3">{project.description}</p>
                        <p className="text-xs text-white/40 mb-3">{project.metrics}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[10px] rounded bg-red-500/10 text-red-400 border border-red-500/20"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Services offered */}
                <section className="glass rounded-3xl p-6 print:bg-white/[0.03] print:rounded-2xl print-break">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    Services
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-xl bg-white/[0.02]">
                      <p className="text-2xl font-bold text-red-500 mb-1">AI</p>
                      <p className="text-xs text-white/50">Integration</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02]">
                      <p className="text-2xl font-bold text-red-500 mb-1">Full-Stack</p>
                      <p className="text-xs text-white/50">Development</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02]">
                      <p className="text-2xl font-bold text-red-500 mb-1">Rapid</p>
                      <p className="text-xs text-white/50">Prototyping</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-8 text-center text-xs text-white/30 print-break">
              <p>Generated from highbee.dev • Available for new projects</p>
            </footer>
          </motion.div>
        </div>
      </main>
    </>
  )
}
