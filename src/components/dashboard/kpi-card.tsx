'use client'

import { Minus, TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  change?: {
    value: number
    trend: 'up' | 'down' | 'neutral'
  }
  timeRange?: string
  sparklineData?: number[]
  tooltip?: string
  className?: string
}

export function KPICard({
  title,
  value,
  change,
  timeRange = 'Last 7 days',
  sparklineData = [],
  tooltip,
  className,
}: KPICardProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3" aria-hidden="true" />
      case 'down':
        return <TrendingDown className="h-3 w-3" aria-hidden="true" />
      case 'neutral':
        return <Minus className="h-3 w-3" aria-hidden="true" />
    }
  }

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return 'text-success'
      case 'down':
        return 'text-destructive'
      case 'neutral':
        return 'text-muted-foreground'
    }
  }

  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length < 2) return null

    const max = Math.max(...sparklineData)
    const min = Math.min(...sparklineData)
    const range = max - min || 1

    const points = sparklineData
      .map((value, index) => {
        const x = (index / (sparklineData.length - 1)) * 100
        const y = 100 - ((value - min) / range) * 100
        return `${x},${y}`
      })
      .join(' ')

    const isPositive = sparklineData[sparklineData.length - 1] > sparklineData[0]

    return (
      <div className="h-8 w-full">
        <svg aria-hidden="true" viewBox="0 0 100 100" className="h-full w-full">
          <polyline
            points={points}
            fill="none"
            className={isPositive ? 'stroke-success' : 'stroke-destructive'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }

  const cardContent = (
    <Card className={cn('glass', className)}>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold mt-1 tabular-nums">{value}</p>
            </div>
            {sparklineData.length > 0 && <div className="h-8 w-16">{renderSparkline()}</div>}
          </div>

          {/* Change indicator */}
          {change && (
            <div className="flex items-center space-x-2">
              <div className={cn('flex items-center space-x-1', getTrendColor(change.trend))}>
                {getTrendIcon(change.trend)}
                <span className="text-sm font-medium">
                  {change.trend === 'up' ? '+' : ''}
                  {change.value}%
                </span>
              </div>
              <span className="text-xs text-muted-foreground">vs {timeRange}</span>
            </div>
          )}

          {/* Time range */}
          <div className="text-xs text-muted-foreground">{timeRange}</div>
        </div>
      </CardContent>
    </Card>
  )

  if (tooltip) {
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

  return cardContent
}
