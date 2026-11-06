'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { User } from '../types'

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  loading: boolean
  user: User | null
}

export function DeleteDialog({ open, onOpenChange, onConfirm, loading, user }: DeleteDialogProps) {
  const t = useTranslations('users.delete')
  const tUsers = useTranslations('users')

  const handleConfirm = () => {
    if (!loading) {
      onConfirm()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>

        {user && (
          <div className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {t.rich('aboutTo', {
                  name: user.name,
                  email: user.email,
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </AlertDescription>
            </Alert>

            <div className="bg-muted/50 p-3 rounded-md">
              <div className="space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex items-center space-x-2 pt-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.role === 'admin'
                        ? 'bg-primary/15 text-primary'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {tUsers(`roles.${user.role}`)}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-success/15 text-success'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {tUsers(`statuses.${user.status}`)}
                  </span>
                </div>
              </div>
            </div>

            {user.role === 'admin' && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{t('adminWarning')}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            {t('cancel')}
          </Button>
          <Button variant="destructive" onClick={handleConfirm} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('deleting')}
              </>
            ) : (
              t('confirm')
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
