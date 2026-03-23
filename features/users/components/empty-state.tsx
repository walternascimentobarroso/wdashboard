'use client';

import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onCreateUser?: () => void;
  filtered?: boolean;
}

export function EmptyState({ onCreateUser, filtered = false }: EmptyStateProps) {
  if (filtered) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-semibold">No users found</h3>
          <p className="text-muted-foreground">
            We couldn't find any users matching your search criteria.
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms.
          </p>
          {onCreateUser && (
            <Button onClick={onCreateUser} variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Create New User
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Users className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold">No users yet</h3>
        <p className="text-muted-foreground">
          Get started by creating your first user account.
        </p>
        <p className="text-sm text-muted-foreground">
          Users can be administrators with full access or regular users with limited permissions.
        </p>
        {onCreateUser && (
          <Button onClick={onCreateUser}>
            <Plus className="mr-2 h-4 w-4" />
            Create Your First User
          </Button>
        )}
      </div>
    </div>
  );
}
