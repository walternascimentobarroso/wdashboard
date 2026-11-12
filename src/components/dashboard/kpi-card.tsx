'use client'

import { Minus, TrendingDown, TrendingUp } from 'lucide-react'
import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type Trend = 'up' | 'down' | 'neutral'

interface KPICardProps {
  title: string
  value: string | number
  icon?: ReactNode
  description?: string
  change?: {
    value: number
    trend: Trend
  }
  sparklineData?: number[]
  tooltip?: string
  className?: string
  loading?: boolean
}

const TREND_ICON = { up: TrendingUp, down: TrendingDown, neutral: Minus }

const TREND_COLOR = {
  up: 'text-link',
  down: 'text-destructive',
  neutral: 'text-muted-foreground',
}

function MiniBars({ values }: { values: number[] }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1

  return (
    <div aria-hidden="true" className="flex h-8 shrink-0 items-end gap-0.5">
      {values.map((value, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: bars only have a position
          key={index}
          className="w-1.5 rounded-sm bg-primary"
          style={{ height: `${30 + ((value - min) / range) * 70}%` }}
        />
      ))}
    </div>
  )
}

export function KPICard({
  title,
  value,
  icon,
  description,
  change,
  sparklineData = [],
  tooltip,
  className,
  loading,
}: KPICardProps) {
  const TrendIcon = change && TREND_ICON[change.trend]

  const cardContent = (
    <Card className={cn('flex items-center gap-4 p-5', className)}>
      {icon && (
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary-soft text-link [&_svg]:size-5">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-muted-foreground">{title}</p>
        {loading ? (
          <Skeleton className="mt-2 mb-1 h-6 w-16 rounded-md" />
        ) : (
          <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
          {change && TrendIcon && (
            <span className={cn('flex items-center gap-1 font-medium', TREND_COLOR[change.trend])}>
              <TrendIcon className="size-3" aria-hidden="true" />
              {change.trend === 'up' ? '+' : ''}
              {change.value}%
            </span>
          )}
          {description && <span className="truncate">{description}</span>}
        </div>
      </div>
      {sparklineData.length > 1 && <MiniBars values={sparklineData} />}
    </Card>
  )

  if (!tooltip) return cardContent

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
