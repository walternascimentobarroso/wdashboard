'use client'

import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
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
  const [showPassword, setShowPassword] = useState(false)
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
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-2">
          <Label htmlFor="email">{t('email')}</Label>
          <div className="relative">
            <Mail
              className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="email"
              className="h-11 rounded-xl border-transparent bg-muted pl-10"
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
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">{t('password')}</Label>
          <div className="relative">
            <Lock
              className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="h-11 rounded-xl border-transparent bg-muted px-10"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword((shown) => !shown)}
              aria-label={t(showPassword ? 'hidePassword' : 'showPassword')}
              aria-pressed={showPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden />
              ) : (
                <Eye className="size-4" aria-hidden />
              )}
            </button>
          </div>
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
            className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="h-11 w-full rounded-xl font-semibold transition-transform active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? t('signingIn') : t('signIn')}
        </Button>
      </form>

      <section aria-labelledby="demo-accounts" className="space-y-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          <h2 id="demo-accounts">{t('demoTryAs')}</h2>
          <span className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.role}
              type="button"
              onClick={() => fillDemoAccount(account)}
              disabled={isLoading}
              className="h-10 rounded-xl border bg-card text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            >
              {t(`roles.${account.role}`)}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
