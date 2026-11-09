'use client'

import { Shield } from 'lucide-react'
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
import type { Role } from '../types'

interface RoleViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  role: Role | null
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">{label}</Label>
      <div className="text-sm">{children}</div>
    </div>
  )
}

export function RoleViewDialog({ open, onOpenChange, role }: RoleViewDialogProps) {
  const t = useTranslations('roles')
  const format = useFormatter()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('form.viewTitle')}</DialogTitle>
          <DialogDescription>{t('form.viewDesc')}</DialogDescription>
        </DialogHeader>

        {role && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary-soft text-link">
                <Shield className="h-5 w-5" />
              </span>
              <span className="font-semibold">{role.name}</span>
            </div>
            <Field label={t('columns.description')}>{role.description || '—'}</Field>
            <Field label={t('columns.status')}>
              <Badge variant={role.status === 'active' ? 'success' : 'secondary'}>
                {t(`statuses.${role.status}`)}
              </Badge>
            </Field>
            <Field label={t('columns.created')}>
              {format.dateTime(new Date(role.createdAt), { dateStyle: 'medium' })}
            </Field>
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            {t('form.close')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
