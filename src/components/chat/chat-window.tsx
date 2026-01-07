'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Send, Sparkles } from 'lucide-react'
import { ChatMessage } from './chat-message'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatWindowProps {
  onClose: () => void
}

const WELCOME_MESSAGE = "Hi! I'm Highbee's AI assistant. Ask me about their services, projects, or availability. How can I help you today?"

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "Tell me about TaskRite",
  "What's your availability?",
]

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || isLoading) return

    const userMessage: Message = { role: 'user', content: messageText }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!response.ok) throw new Error('Failed to fetch')

      const data = await response.json()
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I'm having trouble connecting right now. Please try the contact form or email hello@highbee.dev directly!",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="w-[380px] h-[550px] rounded-2xl overflow-hidden flex flex-col bg-[#0d0d14] border border-white/10 shadow-2xl shadow-black/50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-slate-500/10 to-slate-500/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-400 to-slate-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0d0d14]" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Highbee&apos;s Assistant</p>
            <p className="text-xs text-white/50">Powered by Claude AI</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar"
      >
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white/10 rounded-2xl rounded-tl-md px-4 py-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.1s]" />
                <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            </div>
          </div>
        )}

        {/* Quick questions - show only if few messages */}
        {messages.length <= 2 && !isLoading && (
          <div className="pt-2 space-y-2">
            <p className="text-xs text-white/40">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/70 hover:bg-slate-400/20 hover:text-slate-200 transition-colors border border-white/10"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-slate-400/50 disabled:opacity-50 transition-colors"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-500 to-slate-400 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
