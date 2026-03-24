'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface EmptyStateProps {
  icon?: React.ReactNode
  title?: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      {icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          {icon}
        </div>
      )}

      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}

      {description && <p className="text-sm text-muted-foreground mb-6 max-w-md">{description}</p>}

      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  )
}

// Predefined empty states for common use cases
interface EmptyStateUsersProps {
  onCreateUser?: () => void
  className?: string
}

export function EmptyStateUsers({ onCreateUser, className }: EmptyStateUsersProps) {
  const t = useTranslations()

  return (
    <EmptyState
      icon={
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      }
      title={t('emptyState.users.title')}
      description={t('emptyState.users.description')}
      action={
        onCreateUser
          ? {
              label: t('emptyState.users.action'),
              onClick: onCreateUser,
            }
          : undefined
      }
      className={className}
    />
  )
}

interface EmptyStateFilesProps {
  onUploadFile?: () => void
  className?: string
}

export function EmptyStateFiles({ onUploadFile, className }: EmptyStateFilesProps) {
  const t = useTranslations()

  return (
    <EmptyState
      icon={
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      }
      title={t('emptyState.files.title')}
      description={t('emptyState.files.description')}
      action={
        onUploadFile
          ? {
              label: t('emptyState.files.action'),
              onClick: onUploadFile,
            }
          : undefined
      }
      className={className}
    />
  )
}

interface EmptyStateLogsProps {
  onRefresh?: () => void
  className?: string
}

export function EmptyStateLogs({ onRefresh, className }: EmptyStateLogsProps) {
  const t = useTranslations()

  return (
    <EmptyState
      icon={
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      }
      title={t('emptyState.logs.title')}
      description={t('emptyState.logs.description')}
      action={
        onRefresh
          ? {
              label: t('emptyState.logs.action'),
              onClick: onRefresh,
            }
          : undefined
      }
      className={className}
    />
  )
}
