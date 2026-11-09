'use client'

import { AlertCircle, CheckCircle2, Eye, EyeOff, Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePasswordStrength } from '@/hooks/usePasswordStrength'

interface PasswordChangeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: () => Promise<void>
  isLoading?: boolean
}

export function PasswordChangeModal({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}: PasswordChangeModalProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const t = useTranslations()

  const passwordStrength = usePasswordStrength(newPassword)

  const validatePasswords = () => {
    if (!currentPassword) {
      setError(t('profile.passwordModal.errors.currentRequired'))
      return false
    }
    if (!newPassword) {
      setError(t('profile.passwordModal.errors.newRequired'))
      return false
    }
    if (newPassword.length < 8) {
      setError(t('profile.passwordModal.errors.tooShort'))
      return false
    }
    if (passwordStrength.score < 4) {
      setError(t('profile.passwordModal.errors.tooWeak'))
      return false
    }
    if (newPassword !== confirmPassword) {
      setError(t('profile.passwordModal.mismatch'))
      return false
    }
    if (currentPassword === newPassword) {
      setError(t('profile.passwordModal.errors.sameAsCurrent'))
      return false
    }
    setError('')
    return true
  }

  const requirements = [
    { key: 'minLength', met: newPassword.length >= 8 },
    { key: 'lowercase', met: /[a-z]/.test(newPassword) },
    { key: 'uppercase', met: /[A-Z]/.test(newPassword) },
    { key: 'number', met: /[0-9]/.test(newPassword) },
    { key: 'special', met: /[^a-zA-Z0-9]/.test(newPassword) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePasswords()) return

    try {
      await onSubmit()
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setError('')
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('profile.passwordModal.errors.failed'))
    }
  }

  const getStrengthIcon = () => {
    switch (passwordStrength.level) {
      case 'weak':
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case 'fair':
        return <AlertCircle className="h-4 w-4 text-warning" />
      case 'good':
        return <Shield className="h-4 w-4 text-warning" />
      case 'strong':
        return <CheckCircle2 className="h-4 w-4 text-success" />
      default:
        return null
    }
  }

  const getStrengthText = () => {
    switch (passwordStrength.level) {
      case 'weak':
        return t('profile.passwordModal.strength.weak')
      case 'fair':
        return t('profile.passwordModal.strength.fair')
      case 'good':
        return t('profile.passwordModal.strength.good')
      case 'strong':
        return t('profile.passwordModal.strength.strong')
      default:
        return ''
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full border border-primary/30 bg-primary-soft text-link">
              <Shield className="size-4" />
            </span>
            {t('profile.security.changePassword')}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">{t('profile.passwordModal.currentPassword')}</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder={t('profile.passwordModal.currentPlaceholder')}
                autoComplete="current-password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                aria-label={t(
                  `profile.passwordModal.${showCurrentPassword ? 'hide' : 'show'}Password`
                )}
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">{t('profile.passwordModal.newPassword')}</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('profile.passwordModal.newPlaceholder')}
                autoComplete="new-password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                aria-label={t(`profile.passwordModal.${showNewPassword ? 'hide' : 'show'}Password`)}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>

            {newPassword && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-[width] duration-300 ease-out motion-reduce:transition-none ${passwordStrength.color} ${passwordStrength.width}`}
                    />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {getStrengthIcon()}
                    <span className="text-muted-foreground">{getStrengthText()}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  {requirements.map(({ key, met }) => (
                    <div key={key} className="flex items-center gap-2 text-xs">
                      <div
                        className={`size-2 rounded-full ${met ? 'bg-success' : 'bg-muted-foreground/30'}`}
                      />
                      <span className={met ? 'text-success' : 'text-muted-foreground'}>
                        {t(`profile.passwordModal.requirements.${key}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">{t('profile.passwordModal.confirmPassword')}</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('profile.passwordModal.confirmPlaceholder')}
                autoComplete="new-password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                aria-label={t(
                  `profile.passwordModal.${showConfirmPassword ? 'hide' : 'show'}Password`
                )}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <div aria-live="polite">
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-sm text-destructive">{t('profile.passwordModal.mismatch')}</p>
              )}
              {confirmPassword && newPassword === confirmPassword && (
                <p className="text-sm text-success">{t('profile.passwordModal.match')}</p>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-xl p-3 bg-destructive/10 border border-destructive/30">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              {t('profile.passwordModal.cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
            >
              {isLoading
                ? t('profile.passwordModal.submitting')
                : t('profile.security.changePassword')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
