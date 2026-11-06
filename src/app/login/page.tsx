'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { APP_NAME } from '@/lib/constants'
import { useAuth } from '@/modules/auth/components/AuthProvider'
import { LoginForm } from '@/modules/auth/components/LoginForm'

export default function LoginPage() {
  const router = useRouter()
  const t = useTranslations('auth')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard')
  }, [isAuthenticated, router])

  return (
    <div className="grid min-h-[100dvh] bg-background lg:grid-cols-[5fr_7fr]">
      <aside className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,color-mix(in_oklab,var(--primary-foreground)_18%,transparent),transparent_55%)]"
        />
        <span className="relative text-lg font-semibold tracking-tight">{APP_NAME}</span>
        <p className="relative max-w-sm text-3xl font-semibold leading-tight tracking-tight">
          {t('tagline')}
        </p>
      </aside>

      <main className="flex items-center px-4 py-12 sm:px-8 lg:px-16">
        <div className="login-enter w-full max-w-[400px] space-y-8 lg:ml-[8%]">
          <div className="space-y-2">
            <span className="text-sm font-semibold tracking-tight text-muted-foreground lg:hidden">
              {APP_NAME}
            </span>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">{t('signIn')}</h1>
            <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
          </div>

          <LoginForm onSuccess={() => router.push('/dashboard')} />
        </div>
      </main>
    </div>
  )
}
