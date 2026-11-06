'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const router = useRouter()
  const t = useTranslations()

  useEffect(() => {
    // Check if user is logged in
    let isLoggedIn = null
    try {
      isLoggedIn = localStorage.getItem('isLoggedIn')
    } catch (error) {
      console.error('Failed to get login status:', error)
    }

    if (isLoggedIn === 'true') {
      try {
        router.push('/dashboard')
      } catch (error) {
        console.error('Failed to redirect to dashboard:', error)
      }
    } else {
      try {
        router.push('/login')
      } catch (error) {
        console.error('Failed to redirect to login:', error)
      }
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">{t('common.loading')}</p>
      </div>
    </div>
  )
}
