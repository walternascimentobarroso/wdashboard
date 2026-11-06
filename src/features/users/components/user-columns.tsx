'use client'

import { useFormatter, useTranslations } from 'next-intl'
import type { DataTableColumn } from '@/components/shared/data-table/data-table'
import type { User } from '../types'

const badgeClass = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'

export function useUserColumns(): DataTableColumn<User>[] {
  const t = useTranslations('users.columns')
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
            className={`${badgeClass} bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100`}
          >
            {user.role}
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
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
            }`}
          >
            {user.status}
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
