'use client'

import { CalendarDays, Shield } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import type { DataTableColumn } from '@/components/shared/data-table/data-table'
import { Badge } from '@/components/ui/badge'
import type { Role } from '../types'

export function useRoleColumns(): DataTableColumn<Role>[] {
  const t = useTranslations('roles')
  const format = useFormatter()

  return [
    {
      key: 'name',
      label: t('columns.name'),
      cell: (role) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
            <Shield className="h-4 w-4" />
          </span>
          <span className="font-medium">{role.name}</span>
        </div>
      ),
    },
    {
      key: 'description',
      label: t('columns.description'),
      cell: (role) => <div className="text-sm text-muted-foreground">{role.description}</div>,
    },
    {
      key: 'status',
      label: t('columns.status'),
      cell: (role) => (
        <Badge variant={role.status === 'active' ? 'success' : 'secondary'}>
          {t(`statuses.${role.status}`)}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: t('columns.created'),
      cell: (role) => (
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" />
          {format.dateTime(new Date(role.createdAt), { dateStyle: 'medium' })}
        </div>
      ),
    },
  ]
}
