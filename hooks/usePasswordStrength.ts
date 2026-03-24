'use client'

import { useState, useEffect } from 'react'

export interface PasswordStrength {
  score: number
  level: 'weak' | 'fair' | 'good' | 'strong'
  feedback: string[]
  color: string
  width: string
}

export function usePasswordStrength(password: string) {
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    level: 'weak',
    feedback: [],
    color: 'bg-red-500',
    width: 'w-0'
  })

  useEffect(() => {
    if (!password) {
      setStrength({
        score: 0,
        level: 'weak',
        feedback: [],
        color: 'bg-gray-300',
        width: 'w-0'
      })
      return
    }

    let score = 0
    const feedback: string[] = []

    // Length check
    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push('Password must be at least 8 characters')
    }

    if (password.length >= 12) {
      score += 1
    }

    // Character variety checks
    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push('Include lowercase letters')
    }

    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push('Include uppercase letters')
    }

    if (/[0-9]/.test(password)) {
      score += 1
    } else {
      feedback.push('Include numbers')
    }

    if (/[^a-zA-Z0-9]/.test(password)) {
      score += 1
    } else {
      feedback.push('Include special characters')
    }

    // Determine strength level
    let level: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
    let color = 'bg-red-500'
    let width = 'w-1/4'

    if (score <= 2) {
      level = 'weak'
      color = 'bg-red-500'
      width = 'w-1/4'
    } else if (score <= 4) {
      level = 'fair'
      color = 'bg-orange-500'
      width = 'w-2/4'
    } else if (score <= 5) {
      level = 'good'
      color = 'bg-yellow-500'
      width = 'w-3/4'
    } else {
      level = 'strong'
      color = 'bg-green-500'
      width = 'w-full'
    }

    setStrength({
      score,
      level,
      feedback,
      color,
      width
    })
  }, [password])

  return strength
}
