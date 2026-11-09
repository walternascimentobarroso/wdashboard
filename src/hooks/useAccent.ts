'use client'

import { useEffect, useState } from 'react'

export const ACCENTS = ['lime', 'red', 'orange', 'cyan', 'violet', 'magenta'] as const
export type Accent = (typeof ACCENTS)[number]

const STORAGE_KEY = 'accent'
const DEFAULT_ACCENT: Accent = 'lime'

// Runs in <head> before paint so a stored accent never flashes the default colour.
export const ACCENT_INIT_SCRIPT = `try{var a=localStorage.getItem('${STORAGE_KEY}');if(a&&a!=='${DEFAULT_ACCENT}')document.documentElement.dataset.accent=a}catch(e){}`

function isAccent(value: string | null): value is Accent {
  return ACCENTS.includes(value as Accent)
}

export function useAccent() {
  const [accent, setAccentState] = useState<Accent>(DEFAULT_ACCENT)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isAccent(stored)) setAccentState(stored)
  }, [])

  const setAccent = (next: Accent) => {
    setAccentState(next)
    localStorage.setItem(STORAGE_KEY, next)
    if (next === DEFAULT_ACCENT) delete document.documentElement.dataset.accent
    else document.documentElement.dataset.accent = next
  }

  return { accent, setAccent }
}
