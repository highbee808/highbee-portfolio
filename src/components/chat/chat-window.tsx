'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Send } from 'lucide-react'
import Image from 'next/image'
import { ChatMessage } from './chat-message'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface StoredChat {
  messages: Message[]
  timestamp: number
}

const CHAT_STORAGE_KEY = 'highbee_chat_history'
const CHAT_EXPIRY_DAYS = 7

interface ChatWindowProps {
  onClose: () => void
}

const WELCOME_MESSAGE = "Hi! I'm the AI assistant for Highbee Agency. We build web apps, mobile apps, AI solutions, and brands. How can I help you today?"

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "I need a mobile app",
  "I want to start a project",
]

function loadStoredMessages(): Message[] {
  if (typeof window === 'undefined') return [{ role: 'assistant', content: WELCOME_MESSAGE }]

  try {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY)
    if (!stored) return [{ role: 'assistant', content: WELCOME_MESSAGE }]

    const parsed: StoredChat = JSON.parse(stored)
    const daysSinceChat = (Date.now() - parsed.timestamp) / (1000 * 60 * 60 * 24)

    if (daysSinceChat > CHAT_EXPIRY_DAYS) {
      localStorage.removeItem(CHAT_STORAGE_KEY)
      return [{ role: 'assistant', content: WELCOME_MESSAGE }]
    }

    return parsed.messages.length > 0 ? parsed.messages : [{ role: 'assistant', content: WELCOME_MESSAGE }]
  } catch {
    return [{ role: 'assistant', content: WELCOME_MESSAGE }]
  }
}

export function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(() => loadStoredMessages())
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length <= 1) return // Don't save if only welcome message

    const chatData: StoredChat = {
      messages,
      timestamp: Date.now()
    }
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatData))
  }, [messages])

  const clearChat = () => {
    localStorage.removeItem(CHAT_STORAGE_KEY)
    setMessages([{ role: 'assistant', content: WELCOME_MESSAGE }])
  }

  // Scroll to top on mount to show welcome message and quick options
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0 })
    }
  }, [])

  // Auto-scroll to bottom when new messages are added (after initial load)
  useEffect(() => {
    if (scrollRef.current && messages.length > 1) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages])

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
    <>
      {/* Backdrop for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-50 md:hidden"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ type: 'tween', duration: 0.2 }}
        className="fixed z-50 inset-x-3 bottom-3 top-20 md:top-auto md:inset-auto md:bottom-24 md:right-6 md:w-[380px] md:h-[550px] rounded-2xl overflow-hidden flex flex-col bg-[#0d0d14] border border-white/10 shadow-2xl shadow-black/50 max-h-[80dvh] md:max-h-none"
      >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-red-600/10 to-red-700/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-red-500/50">
              <Image
                src="/images/profile-cartoon.png"
                alt="Highbee"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0d0d14]" />
          </div>
          <div>
            <p className="font-semibold text-white text-sm">Highbee Agency</p>
            <p className="text-xs text-white/50">AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 1 && (
            <button
              onClick={clearChat}
              className="text-xs text-white/40 hover:text-white/60 transition-colors px-2 py-1"
              title="Start new conversation"
            >
              New chat
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
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
            <div className="w-8 h-8 rounded-full overflow-hidden border border-red-500/50 flex-shrink-0">
              <Image
                src="/images/profile-cartoon.png"
                alt="Highbee"
                width={32}
                height={32}
                className="object-cover"
              />
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
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/70 hover:bg-red-600/20 hover:text-red-200 transition-colors border border-white/10"
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
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-base md:text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 disabled:opacity-50 transition-colors"
            style={{ touchAction: 'manipulation' }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      </motion.div>
    </>
  )
}
