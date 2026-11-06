'use client'

import { Plus, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onCreateUser?: () => void
  filtered?: boolean
}

function EmptyStateContent({
  title,
  description,
  buttonText,
  buttonVariant = 'default',
  onCreateUser,
}: {
  title: string
  description: string
  buttonText: string
  buttonVariant?: 'default' | 'outline'
  onCreateUser?: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Users className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        {onCreateUser && (
          <Button onClick={onCreateUser} variant={buttonVariant}>
            <Plus className="mr-2 h-4 w-4" />
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  )
}

export function EmptyState({ onCreateUser, filtered = false }: EmptyStateProps) {
  const t = useTranslations('users.empty')

  return (
    <EmptyStateContent
      title={t(filtered ? 'filteredTitle' : 'title')}
      description={t(filtered ? 'filteredDescription' : 'description')}
      buttonText={t('button')}
      buttonVariant={filtered ? 'outline' : 'default'}
      onCreateUser={onCreateUser}
    />
  )
}
