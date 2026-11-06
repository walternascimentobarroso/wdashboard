'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useEffect } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { useAuth } from '@/modules/auth/components/AuthProvider'

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const t = useTranslations()
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace('/login')
  }, [isAuthenticated, isLoading, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
