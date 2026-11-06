'use client'

import { useEffect, useState } from 'react'

export interface PasswordStrength {
  score: number
  level: 'weak' | 'fair' | 'good' | 'strong'
  color: string
  width: string
}

export function usePasswordStrength(password: string) {
  const [strength, setStrength] = useState<PasswordStrength>({
    score: 0,
    level: 'weak',
    color: 'bg-destructive',
    width: 'w-0',
  })

  useEffect(() => {
    if (!password) {
      setStrength({
        score: 0,
        level: 'weak',
        color: 'bg-muted',
        width: 'w-0',
      })
      return
    }

    let score = 0

    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^a-zA-Z0-9]/.test(password)) score += 1

    let level: 'weak' | 'fair' | 'good' | 'strong' = 'weak'
    let color = 'bg-destructive'
    let width = 'w-1/4'

    if (score <= 2) {
      level = 'weak'
      color = 'bg-destructive'
      width = 'w-1/4'
    } else if (score <= 4) {
      level = 'fair'
      color = 'bg-warning'
      width = 'w-2/4'
    } else if (score <= 5) {
      level = 'good'
      color = 'bg-warning'
      width = 'w-3/4'
    } else {
      level = 'strong'
      color = 'bg-success'
      width = 'w-full'
    }

    setStrength({
      score,
      level,
      color,
      width,
    })
  }, [password])

  return strength
}
