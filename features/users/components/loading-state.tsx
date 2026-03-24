'use client'

import { Loader2 } from 'lucide-react'

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <h3 className="text-lg font-semibold">Loading users...</h3>
        <p className="text-muted-foreground">Please wait while we fetch the user data.</p>
      </div>
    </div>
  )
}
