'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getLocale } from '@/lib/getLocale'

export function useLocale() {
  const [locale, setLocaleState] = useState('en')
  const router = useRouter()

  useEffect(() => {
    // Get locale from cookie or browser detection
    const detectedLocale = getLocale()
    setLocaleState(detectedLocale)
  }, [])

  const changeLocale = (newLocale: string) => {
    // Set cookie for server-side detection
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    // Update state immediately for UI responsiveness
    setLocaleState(newLocale)
    // Force a refresh to apply the new locale throughout the app
    router.refresh()
  }

  return { locale, changeLocale }
}
