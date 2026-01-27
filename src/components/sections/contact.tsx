'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Calendar, Mail, Clock, CheckCircle, Loader2 } from 'lucide-react'

const projectTypes = [
  { value: 'ai-integration', label: 'AI Integration' },
  { value: 'full-stack', label: 'Full-Stack Development' },
  { value: 'mvp', label: 'MVP / Prototype' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
]

const budgetRanges = [
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000-5000', label: '$1,000 - $5,000' },
  { value: '5000-10000', label: '$5,000 - $10,000' },
  { value: '10000+', label: '$10,000+' },
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

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
}

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', projectType: '', budget: '', message: '' })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />

      {/* Gradient orbs */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-slate-500/10 blur-[150px]" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-slate-500/10 blur-[120px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        {/* Section header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6">
            <Mail className="w-4 h-4 text-slate-300" />
            <span className="text-sm text-white/70">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s Build Something
            <br />
            <span className="text-gradient">Amazing Together</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Fill out the form below
            or book a call directly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="glass rounded-2xl p-8">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-white/60 mb-6">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-slate-300 hover:text-slate-200 transition-colors"
                  >
                    Send another message →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-white/70 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-slate-400/50 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-white/70 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-slate-400/50 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Project Type & Budget */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="projectType" className="block text-sm text-white/70 mb-2">
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-slate-400/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0a0a0f]">
                          Select a type
                        </option>
                        {projectTypes.map((type) => (
                          <option key={type.value} value={type.value} className="bg-[#0a0a0f]">
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm text-white/70 mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-slate-400/50 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[#0a0a0f]">
                          Select a range
                        </option>
                        {budgetRanges.map((range) => (
                          <option key={range.value} value={range.value} className="bg-[#0a0a0f]">
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm text-white/70 mb-2">
                      Tell me about your project
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-slate-400/50 transition-colors resize-none"
                      placeholder="Describe your project, goals, and any specific requirements..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-slate-500 to-slate-400 text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-slate-400/25 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-center text-xs text-white/40">
                    Usually respond within 24 hours
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Calendly / Alternative */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Quick info cards */}
            <div className="grid gap-4">
              <div className="glass rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-400/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-slate-300" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Response Time</h4>
                  <p className="text-sm text-white/60">Usually within 24 hours</p>
                </div>
              </div>

              <div className="glass rounded-xl p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-400/20 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-slate-300" />
                </div>
                <div>
                  <h4 className="font-medium text-white">Book a Call</h4>
                  <p className="text-sm text-white/60">30-minute intro call</p>
                </div>
              </div>
            </div>

            {/* Cal.com embed */}
            <div className="glass rounded-2xl p-6 overflow-hidden">
              <h4 className="font-medium text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-slate-300" />
                Schedule a Call
              </h4>

              {/* Calendar embed */}
              <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                <iframe
                  src="https://cal.com/ibrahim-lawal-wj6g11/30min?embed=true&theme=dark"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  className="rounded-xl"
                />
              </div>

              {/* Direct email link */}
              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-sm text-white/50 mb-2">Prefer email?</p>
                <a
                  href="mailto:hello@highbee.dev"
                  className="text-slate-300 hover:text-slate-200 transition-colors inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  hello@highbee.dev
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
