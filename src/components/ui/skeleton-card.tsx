'use client'

import * as React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface SkeletonCardProps {
  className?: string
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
    </Card>
  )
}

interface SkeletonKPICardProps {
  className?: string
}

export function SkeletonKPICard({ className }: SkeletonKPICardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <Skeleton className="h-4 w-3/4 mb-3" />
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
    </Card>
  )
}

interface SkeletonTableProps {
  rows?: number
  columns?: number
  className?: string
}

export function SkeletonTable({ rows = 5, columns = 4, className }: SkeletonTableProps) {
  return (
    <div className={className}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex space-x-4">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={`header-${i}`} className="h-4 flex-1" />
          ))}
        </div>

        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

interface SkeletonListProps {
  items?: number
  className?: string
}

export function SkeletonList({ items = 5, className }: SkeletonListProps) {
  return (
    <div className={className}>
      <div className="space-y-3">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface SkeletonActivityProps {
  items?: number
  className?: string
}

export function SkeletonActivity({ items = 5, className }: SkeletonActivityProps) {
  return (
    <div className={className}>
      <div className="space-y-4">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="flex space-x-3">
            <Skeleton className="h-2 w-2 rounded-full mt-2" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
