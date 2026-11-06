'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useAuth } from '@/modules/auth/components/AuthProvider'

export default function HomePage() {
  const router = useRouter()
  const t = useTranslations()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isLoading) return
    router.replace(isAuthenticated ? '/dashboard' : '/login')
  }, [isAuthenticated, isLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">{t('common.loading')}</p>
      </div>
    </div>
  )
}
