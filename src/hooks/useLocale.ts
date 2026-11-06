'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
    // biome-ignore lint/suspicious/noDocumentCookie: must be set synchronously before the reload below
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    // Update state immediately for UI responsiveness
    setLocaleState(newLocale)
    // Force a refresh to apply the new locale throughout the app
    router.refresh()
  }

  return { locale, changeLocale }
}
