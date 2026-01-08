'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Download, ExternalLink, Database, Bot, Layers, Zap, CheckCircle2 } from 'lucide-react'
import { taskRiteData } from '@/lib/case-study/taskrite-data'

export default function PDFCaseStudyPage() {
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
          .print-break-before {
            page-break-before: always;
          }
          @page {
            size: A4;
            margin: 0.4in;
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
              href="/projects/taskrite/assets"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Assets</span>
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

        {/* Case Study Content */}
        <div className="relative z-10 px-6 py-8 print:py-0 print:px-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Page 1: Header */}
            <header className="glass rounded-3xl p-8 mb-6 print:bg-white/[0.03] print:rounded-2xl print-break">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Image */}
                <div className="relative print:hidden">
                  <div className="absolute inset-[-4px] rounded-full bg-gradient-conic animate-spin-slow" />
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-[#0a0a0f]">
                    <Image
                      src="/images/profile-cartoon.png"
                      alt={taskRiteData.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse print:animate-none" />
                      <span className="text-xs text-emerald-400">Live Project</span>
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {taskRiteData.title}
                  </h1>
                  <p className="text-lg text-red-500 font-medium mb-2">
                    {taskRiteData.tagline}
                  </p>
                  <p className="text-white/60 max-w-xl">
                    {taskRiteData.description}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex flex-col gap-1 text-sm">
                  <span className="font-medium text-white">{taskRiteData.author.name}</span>
                  <span className="text-white/50">{taskRiteData.author.title}</span>
                  <span className="text-red-500">{taskRiteData.author.website}</span>
                </div>
              </div>
            </header>

            {/* Metrics */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 print-break">
              {taskRiteData.metrics.map((metric, index) => {
                const icons = [Database, Bot, Layers, Zap]
                const Icon = icons[index] || Database
                return (
                  <div
                    key={metric.label}
                    className="glass rounded-2xl p-4 text-center print:bg-white/[0.03]"
                  >
                    <Icon className="w-6 h-6 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                    <div className="text-xs text-white/40 uppercase tracking-wide">{metric.label}</div>
                  </div>
                )
              })}
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="md:col-span-1 space-y-6">
                {/* Tech Stack */}
                <section className="glass rounded-2xl p-6 print:bg-white/[0.03] print-break">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    Tech Stack
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {taskRiteData.techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className="px-3 py-1.5 text-sm rounded-lg bg-white/[0.05] text-white/70 border border-white/10"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </section>

                {/* The Problem */}
                <section className="glass rounded-2xl p-6 bg-gradient-to-br from-red-600/10 to-transparent print:bg-white/[0.03] print-break">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs mb-3">
                    The Problem
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Task Management is Broken</h3>
                  <p className="text-sm text-white/50">
                    {taskRiteData.problem}
                  </p>
                </section>

                {/* Key Learnings */}
                <section className="glass rounded-2xl p-6 print:bg-white/[0.03] print-break">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    Key Learnings
                  </h2>
                  <ul className="space-y-3 text-sm text-white/60">
                    {taskRiteData.learnings.map((learning, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {learning}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Right Column - Main Content */}
              <div className="md:col-span-2 space-y-6">
                {/* Features */}
                <section className="glass rounded-2xl p-6 print:bg-white/[0.03] print-break">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {taskRiteData.features.map((feature, index) => (
                      <div
                        key={feature.title}
                        className="p-4 rounded-xl bg-white/[0.02] border border-white/10"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-sm font-bold mb-3">
                          {index + 1}
                        </div>
                        <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                        <p className="text-xs text-white/50">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Architecture */}
                <section className="glass rounded-2xl p-6 print:bg-white/[0.03] print-break print-break-before">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    System Architecture
                  </h2>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs">1</span>
                        Frontend Layer
                      </h3>
                      <p className="text-sm text-white/50">{taskRiteData.architecture.frontend.join(' • ')}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-red-600/10 border border-red-500/20">
                      <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-red-500 flex items-center justify-center text-white text-xs">2</span>
                        AI Layer
                      </h3>
                      <p className="text-sm text-white/50">{taskRiteData.architecture.ai.join(' • ')}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                      <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-white text-xs">3</span>
                        Backend Layer
                      </h3>
                      <p className="text-sm text-white/50">{taskRiteData.architecture.backend.join(' • ')}</p>
                    </div>
                  </div>
                </section>

                {/* Challenges */}
                <section className="glass rounded-2xl p-6 print:bg-white/[0.03] print-break">
                  <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <div className="w-8 h-px bg-gradient-to-r from-red-500 to-transparent" />
                    Challenges & Solutions
                  </h2>
                  <div className="space-y-4">
                    {taskRiteData.challenges.map((item, index) => (
                      <div key={index} className="p-4 rounded-xl bg-white/[0.02] border border-white/10">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <span className="inline-block px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs mb-1">
                              Challenge
                            </span>
                            <p className="text-sm font-medium text-white">{item.challenge}</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs mb-1">
                            Solution
                          </span>
                          <p className="text-sm text-white/60">{item.solution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* CTA Section */}
            <section className="glass rounded-2xl p-8 mt-6 text-center print:bg-white/[0.03] print-break">
              <h2 className="text-2xl font-bold text-white mb-2">Try TaskRite</h2>
              <p className="text-white/50 mb-4 max-w-lg mx-auto">
                Transform how you manage tasks with AI-powered conversations.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={taskRiteData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium no-print"
                >
                  Visit Live Site
                  <ExternalLink className="w-4 h-4" />
                </a>
                <span className="hidden print:inline-block text-red-500 font-medium">
                  {taskRiteData.url}
                </span>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-8 text-center text-xs text-white/30 print-break">
              <p>Case Study by {taskRiteData.author.name} • {taskRiteData.author.website}</p>
            </footer>
          </motion.div>
        </div>
      </main>
    </>
  )
}
