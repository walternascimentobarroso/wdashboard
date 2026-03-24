'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useTranslations } from 'next-intl'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded?: boolean
  onToggle?: () => void
  companyName?: string
}

export function Sidebar({
  expanded = true,
  onToggle,
  className,
  children,
  companyName = 'WDashboard',
  ...props
}: SidebarProps) {
  const t = useTranslations()

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          'flex flex-col h-full bg-background border-r transition-all duration-300',
          expanded ? 'w-64' : 'w-16',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {expanded && <span className="font-semibold">{companyName}</span>}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
                {expanded ? (
                  <ChevronLeft className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{expanded ? t('sidebar.collapse') : t('sidebar.expand')}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-6">{children}</nav>
      </div>
    </TooltipProvider>
  )
}

export function SidebarCategory({
  title,
  expanded = true,
  children,
}: {
  title: string
  expanded?: boolean
  children: React.ReactNode
}) {
  if (!expanded) {
    return <>{children}</>
  }

  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

export function SidebarItem({
  icon,
  label,
  href,
  expanded = true,
  active = false,
  ...props
}: {
  icon: React.ReactNode
  label: string
  href: string
  expanded?: boolean
  active?: boolean
}) {
  const content = (
    <Button
      variant={active ? 'secondary' : 'ghost'}
      className={cn('w-full justify-start', !expanded && 'px-2')}
      asChild
      {...props}
    >
      <Link href={href}>
        {icon}
        {expanded && <span className="ml-2">{label}</span>}
      </Link>
    </Button>
  )

  if (!expanded) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
