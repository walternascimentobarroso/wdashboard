import type { ReactNode } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface ProgressRingCardProps {
  title: string
  percent: number
  ringLabel: string
  rows: { label: string; value: number; tone?: 'positive' | 'negative' }[]
  footer?: ReactNode
  loading?: boolean
}

const RADIUS = 52
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

const TONE_CLASS = { positive: 'text-link', negative: 'text-destructive' }

export function ProgressRingCard({
  title,
  percent,
  ringLabel,
  rows,
  footer,
  loading,
}: ProgressRingCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative size-32 shrink-0">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              strokeWidth="10"
              className="stroke-muted"
            />
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
              className="stroke-primary transition-[stroke-dashoffset] duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {loading ? (
              <Skeleton className="h-8 w-14 rounded-md" />
            ) : (
              <span className="text-3xl font-semibold tabular-nums">{percent}%</span>
            )}
            <span className="text-xs text-muted-foreground">{ringLabel}</span>
          </div>
        </div>
        <dl className="w-full divide-y divide-border text-sm">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-2">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd className={`font-semibold tabular-nums ${row.tone ? TONE_CLASS[row.tone] : ''}`}>
                {loading ? <Skeleton className="h-4 w-8 rounded-md" /> : row.value}
              </dd>
            </div>
          ))}
        </dl>
      </CardContent>
      {footer && <CardFooter className="justify-end">{footer}</CardFooter>}
    </Card>
  )
}
