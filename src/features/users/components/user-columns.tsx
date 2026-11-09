'use client'

import { CalendarDays, Mail } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import type { DataTableColumn } from '@/components/shared/data-table/data-table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import type { User } from '../types'

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function useUserColumns(): DataTableColumn<User>[] {
  const t = useTranslations('users.columns')
  const tUsers = useTranslations('users')
  const format = useFormatter()

  return [
    {
      key: 'name',
      label: t('name'),
      cell: (user) => (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary-soft text-xs font-semibold text-link">
              {initials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{user.name}</span>
        </div>
      ),
    },
    {
      key: 'email',
      label: t('email'),
      cell: (user) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="size-4 shrink-0" aria-hidden="true" />
          {user.email}
        </div>
      ),
    },
    {
      key: 'role',
      label: t('role'),
      cell: (user) => (
        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
          {tUsers(`roles.${user.role}`)}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: t('status'),
      cell: (user) => (
        <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
          {tUsers(`statuses.${user.status}`)}
        </Badge>
      ),
    },
    {
      key: 'createdAt',
      label: t('created'),
      cell: (user) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
          {format.dateTime(new Date(user.createdAt), { dateStyle: 'medium' })}
        </div>
      ),
    },
  ]
}
