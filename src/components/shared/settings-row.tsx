import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SettingsRowProps {
  icon: ReactNode
  title: string
  description?: string
  /** Control shown on the right (switch, select...). Without it, href/onClick show a chevron. */
  action?: ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

const ROW_CLASS = 'flex w-full items-center gap-4 px-5 py-4 text-left'

export function SettingsRow({
  icon,
  title,
  description,
  action,
  href,
  onClick,
  className,
}: SettingsRowProps) {
  const content = (
    <>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary-soft text-link [&_svg]:size-4">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      {action ??
        ((href || onClick) && (
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        ))}
    </>
  )

  const interactive = 'transition-colors hover:bg-muted/60'

  if (href && !action)
    return (
      <Link href={href} className={cn(ROW_CLASS, interactive, className)}>
        {content}
      </Link>
    )

  if (onClick && !action)
    return (
      <button type="button" onClick={onClick} className={cn(ROW_CLASS, interactive, className)}>
        {content}
      </button>
    )

  return <div className={cn(ROW_CLASS, className)}>{content}</div>
}

interface SettingsCardProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function SettingsCard({ title, icon, children, className }: SettingsCardProps) {
  return (
    <Card glass className={cn('overflow-hidden', className)}>
      <div className="flex items-center gap-2 border-b px-5 py-4 [&_svg]:size-4 [&_svg]:text-link">
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="divide-y">{children}</div>
    </Card>
  )
}
