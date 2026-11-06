'use client'

import { useTranslations } from 'next-intl'
import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from './AuthProvider'

const DEMO_ACCOUNTS = [
  { role: 'admin', email: 'admin@dashboard.com', password: 'admin123' },
  { role: 'user', email: 'user@dashboard.com', password: 'user123' },
  { role: 'viewer', email: 'viewer@dashboard.com', password: 'viewer123' },
] as const

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const t = useTranslations('auth')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password, rememberMe)
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : t('loginFailed'))
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoAccount = (account: (typeof DEMO_ACCOUNTS)[number]) => {
    setEmail(account.email)
    setPassword(account.password)
    setError('')
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">{t('password')}</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
            className="size-4 rounded border-input accent-primary"
          />
          <Label htmlFor="remember" className="font-normal text-muted-foreground">
            {t('rememberMe')}
          </Label>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-md border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full transition-transform active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? t('signingIn') : t('signIn')}
        </Button>
      </form>

      <section aria-labelledby="demo-accounts" className="space-y-3 border-t pt-6">
        <div className="space-y-1">
          <h2 id="demo-accounts" className="text-sm font-medium text-foreground">
            {t('demoCredentials')}
          </h2>
          <p className="text-xs text-muted-foreground">{t('demoHint')}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.role}
              type="button"
              onClick={() => fillDemoAccount(account)}
              disabled={isLoading}
              className="rounded-md border px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            >
              {t(`roles.${account.role}`)}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
