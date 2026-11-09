'use client'

import { BarChart3, FolderOpen, Moon, Sun, Users, Zap } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { APP_NAME } from '@/lib/constants'
import { useAuth } from '@/modules/auth/components/AuthProvider'
import { LoginForm } from '@/modules/auth/components/LoginForm'

const FEATURES = [
  { key: 'users', icon: Users },
  { key: 'files', icon: FolderOpen },
  { key: 'activity', icon: BarChart3 },
] as const

export default function LoginPage() {
  const router = useRouter()
  const t = useTranslations()
  const { isAuthenticated } = useAuth()
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard')
  }, [isAuthenticated, router])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-shell bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:48px_48px]">
      <header className="flex items-center justify-between px-4 py-4 sm:px-8">
        <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
          <Zap className="size-6 fill-primary text-primary" aria-hidden />
          {APP_NAME}
        </span>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="size-4 dark:hidden" aria-hidden />
            <Moon className="hidden size-4 dark:block" aria-hidden />
            <span className="sr-only">{t('theme.toggle')}</span>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="login-enter grid w-full max-w-5xl overflow-hidden glass rounded-2xl lg:grid-cols-2">
          <aside className="relative hidden min-h-[600px] lg:block">
            <Image
              src="/images/login-hero.webp"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 512px, 0px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 space-y-6 p-10 text-white">
              <p className="text-3xl font-semibold leading-tight tracking-tight">
                {t('auth.heroLine1')}
                <br />
                <span className="text-primary">{t('auth.heroHighlight')}</span>{' '}
                {t('auth.heroLine2')}
              </p>
              <ul className="space-y-3">
                {FEATURES.map(({ key, icon: Icon }) => (
                  <li key={key} className="flex items-center gap-3 text-sm">
                    <span className="flex size-8 items-center justify-center rounded-full bg-white text-black">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    {t(`auth.features.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="flex flex-col justify-center px-6 py-10 sm:px-12">
            <div className="mb-8 space-y-3 text-center">
              <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-soft text-link">
                <Zap className="size-5 fill-current" aria-hidden />
              </span>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                {t('auth.welcomeBack')}
              </h1>
              <p className="text-sm text-muted-foreground">{t('auth.subtitle')}</p>
            </div>
            <LoginForm onSuccess={() => router.push('/dashboard')} />
          </section>
        </div>
      </main>

      <footer className="px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {APP_NAME}
      </footer>
    </div>
  )
}
