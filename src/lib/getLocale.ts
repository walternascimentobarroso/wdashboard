export function getBrowserLocale(): string {
  if (typeof window === 'undefined') return 'en'

  const lang = navigator.language.split('-')[0]

  if (lang === 'pt') return 'pt'
  return 'en'
}

export function getLocale(): string {
  // Check for cookie first
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';')
    const localeCookie = cookies.find((cookie) => cookie.trim().startsWith('locale='))

    if (localeCookie) {
      const value = localeCookie.split('=')[1]
      if (['en', 'pt'].includes(value)) {
        return value
      }
    }
  }

  // Fallback to browser detection
  return getBrowserLocale()
}
