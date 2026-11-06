'use client'

import { Users, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  onCreateUser?: () => void
  filtered?: boolean
}

function EmptyStateContent({
  title,
  description,
  subDescription,
  buttonText,
  buttonVariant = 'default',
  onCreateUser,
}: {
  title: string
  description: string
  subDescription: string
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
        <p className="text-sm text-muted-foreground">{subDescription}</p>
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
  if (filtered) {
    return (
      <EmptyStateContent
        title="No users found"
        description="We couldn't find any users matching your search criteria."
        subDescription="Try adjusting your filters or search terms."
        buttonText="Create New User"
        buttonVariant="outline"
        onCreateUser={onCreateUser}
      />
    )
  }

  return (
    <EmptyStateContent
      title="No users yet"
      description="Get started by creating your first user account."
      subDescription="Users can be administrators with full access or regular users with limited permissions."
      buttonText="Create Your First User"
      buttonVariant="default"
      onCreateUser={onCreateUser}
    />
  )
}
