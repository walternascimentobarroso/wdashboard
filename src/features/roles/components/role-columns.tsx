'use client'

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
      cell: (role) => <div className="font-medium">{role.name}</div>,
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
        <Badge variant={role.status === 'active' ? 'default' : 'outline'}>
          {t(`statuses.${role.status}`)}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: t('columns.created'),
      cell: (role) => (
        <div className="text-sm text-muted-foreground">
          {format.dateTime(new Date(role.createdAt), { dateStyle: 'medium' })}
        </div>
      ),
    },
  ]
}
