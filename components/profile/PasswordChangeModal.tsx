'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePasswordStrength } from '@/hooks/usePasswordStrength'
import { Eye, EyeOff, Shield, AlertCircle, CheckCircle2 } from 'lucide-react'

interface PasswordChangeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (currentPassword: string, newPassword: string) => Promise<void>
  isLoading?: boolean
}

export function PasswordChangeModal({ 
  open, 
  onOpenChange, 
  onSubmit, 
  isLoading = false 
}: PasswordChangeModalProps) {
  const t = useTranslations()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  const passwordStrength = usePasswordStrength(newPassword)

  const validatePasswords = () => {
    if (!currentPassword) {
      setError('Current password is required')
      return false
    }
    if (!newPassword) {
      setError('New password is required')
      return false
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long')
      return false
    }
    if (passwordStrength.score < 4) {
      setError('Password is too weak. Please include more character variety')
      return false
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (currentPassword === newPassword) {
      setError('New password must be different from current password')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validatePasswords()) return

    try {
      await onSubmit(currentPassword, newPassword)
      // Reset form on success
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setError('')
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password')
    }
  }

  const getStrengthIcon = () => {
    switch (passwordStrength.level) {
      case 'weak':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'fair':
        return <AlertCircle className="h-4 w-4 text-orange-500" />
      case 'good':
        return <Shield className="h-4 w-4 text-yellow-500" />
      case 'strong':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getStrengthText = () => {
    switch (passwordStrength.level) {
      case 'weak':
        return 'Weak password'
      case 'fair':
        return 'Fair password'
      case 'good':
        return 'Good password'
      case 'strong':
        return 'Strong password'
      default:
        return ''
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Change Password
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>

            {/* Password Strength Indicator */}
            {newPassword && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ease-out ${passwordStrength.color} ${passwordStrength.width}`}
                    />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {getStrengthIcon()}
                    <span className="text-muted-foreground">{getStrengthText()}</span>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-3 h-3 rounded-full ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className={newPassword.length >= 8 ? 'text-green-700' : 'text-muted-foreground'}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-3 h-3 rounded-full ${/[a-z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className={/[a-z]/.test(newPassword) ? 'text-green-700' : 'text-muted-foreground'}>
                      Lowercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-3 h-3 rounded-full ${/[A-Z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className={/[A-Z]/.test(newPassword) ? 'text-green-700' : 'text-muted-foreground'}>
                      Uppercase letter
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-3 h-3 rounded-full ${/[0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className={/[0-9]/.test(newPassword) ? 'text-green-700' : 'text-muted-foreground'}>
                      Number
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-3 h-3 rounded-full ${/[^a-zA-Z0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <span className={/[^a-zA-Z0-9]/.test(newPassword) ? 'text-green-700' : 'text-muted-foreground'}>
                      Special character
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-sm text-red-500">Passwords do not match</p>
            )}
            {confirmPassword && newPassword === confirmPassword && (
              <p className="text-sm text-green-500">Passwords match</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
