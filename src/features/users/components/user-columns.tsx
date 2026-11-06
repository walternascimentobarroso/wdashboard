'use client'

import { useFormatter, useTranslations } from 'next-intl'
import type { DataTableColumn } from '@/components/shared/data-table/data-table'
import type { User } from '../types'

const badgeClass = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'

export function useUserColumns(): DataTableColumn<User>[] {
  const t = useTranslations('users.columns')
  const tUsers = useTranslations('users')
  const format = useFormatter()

  return [
    {
      key: 'name',
      label: t('name'),
      cell: (user) => <div className="font-medium">{user.name}</div>,
    },
    {
      key: 'email',
      label: t('email'),
      cell: (user) => <div className="text-sm text-muted-foreground">{user.email}</div>,
    },
    {
      key: 'role',
      label: t('role'),
      cell: (user) => (
        <div className="capitalize">
          <span
            className={`${badgeClass} ${user.role === 'admin' ? 'bg-primary/15 text-primary' : 'bg-muted text-muted-foreground'}`}
          >
            {tUsers(`roles.${user.role}`)}
          </span>
        </div>
      ),
    },
    {
      key: 'status',
      label: t('status'),
      cell: (user) => (
        <div className="capitalize">
          <span
            className={`${badgeClass} ${
              user.status === 'active'
                ? 'bg-success/15 text-success'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {tUsers(`statuses.${user.status}`)}
          </span>
        </div>
      ),
    },
    {
      key: 'createdAt',
      label: t('created'),
      cell: (user) => (
        <div className="text-sm text-muted-foreground">
          {format.dateTime(new Date(user.createdAt), { dateStyle: 'medium' })}
        </div>
      ),
    },
  ]
}
