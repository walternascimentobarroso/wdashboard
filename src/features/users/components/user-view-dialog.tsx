'use client'

import { useFormatter, useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import type { User } from '../types'

interface UserViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="text-sm">{children}</div>
    </div>
  )
}

export function UserViewDialog({ open, onOpenChange, user }: UserViewDialogProps) {
  const t = useTranslations()
  const format = useFormatter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('users.form.viewTitle')}</DialogTitle>
          <DialogDescription>{t('users.form.viewDesc')}</DialogDescription>
        </DialogHeader>

        {user && (
          <div className="space-y-4">
            <Field label={t('users.columns.name')}>{user.name}</Field>
            <Field label={t('users.columns.email')}>{user.email}</Field>
            <Field label={t('users.columns.role')}>
              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                {t(`users.roles.${user.role}`)}
              </Badge>
            </Field>
            <Field label={t('users.columns.status')}>
              <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
                {t(`users.statuses.${user.status}`)}
              </Badge>
            </Field>
            <Field label={t('users.columns.created')}>
              {format.dateTime(new Date(user.createdAt), { dateStyle: 'medium' })}
            </Field>
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t('users.form.close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
