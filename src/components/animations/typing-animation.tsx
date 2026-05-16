'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TypingAnimationProps {
  phrases: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  className?: string
}

export function TypingAnimation({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  className = '',
}: TypingAnimationProps) {
  const [useStaticText, setUseStaticText] = useState(false)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const currentPhrase = phrases[currentPhraseIndex]

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    setUseStaticText(reduceMotion)
  }, [])

  const handleTyping = useCallback(() => {
    if (isPaused) return

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentPhrase.length) {
        setCurrentText(currentPhrase.slice(0, currentText.length + 1))
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true)
        setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, pauseDuration)
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(currentText.slice(0, -1))
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false)
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
      }
    }
  }, [currentText, currentPhrase, isDeleting, isPaused, pauseDuration, phrases.length])

  useEffect(() => {
    if (useStaticText) return

    const speed = isDeleting ? deletingSpeed : typingSpeed
    const timeout = setTimeout(handleTyping, speed)
    return () => clearTimeout(timeout)
  }, [handleTyping, isDeleting, deletingSpeed, typingSpeed, useStaticText])

  // Get color based on current phrase
  const getColor = () => {
    const colors = [
      'from-slate-300 to-slate-500', // AI Integration
      'from-slate-300 to-slate-500',     // Full-Stack Apps
      'from-red-400 to-red-600',     // Rapid Prototyping
    ]
    return colors[currentPhraseIndex % colors.length]
  }

  if (useStaticText) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent font-semibold">
          {phrases[0]}
        </span>
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gpu-boost ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentPhraseIndex}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
          className={`bg-gradient-to-r ${getColor()} bg-clip-text text-transparent font-semibold`}
        >
          {currentText}
        </motion.span>
      </AnimatePresence>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[1.1em] bg-gradient-to-b from-slate-400 to-slate-400 ml-1 rounded-full"
      />
    </span>
  )
}
