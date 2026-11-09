'use client'

import { ChevronUp, LogOut, Zap } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import type * as React from 'react'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded?: boolean
  onLogout?: () => void
  companyName?: string
}

const itemClass =
  'flex h-11 w-full items-center gap-3 rounded-xl border border-transparent px-3 text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

function WithTooltip({
  label,
  show,
  children,
}: {
  label: string
  show: boolean
  children: React.ReactElement
}) {
  if (!show) return children
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  )
}

export function Sidebar({
  expanded = true,
  onLogout,
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
          'flex h-full shrink-0 flex-col border-r sidebar-surface transition-[width] duration-300 motion-reduce:transition-none',
          expanded ? 'w-62' : 'w-19',
          className
        )}
        {...props}
      >
        <div
          className={cn('flex h-[72px] items-center gap-3', expanded ? 'px-6' : 'justify-center')}
        >
          <Zap className="h-6 w-6 shrink-0 fill-primary text-primary" aria-hidden="true" />
          {expanded && (
            <span className="truncate text-base font-semibold uppercase tracking-[0.15em]">
              {companyName}
            </span>
          )}
        </div>

        <nav className={cn('flex-1 space-y-4 overflow-y-auto py-4', expanded ? 'px-4' : 'px-3')}>
          {children}
        </nav>

        {onLogout && (
          <div className={cn('border-t py-4', expanded ? 'px-4' : 'px-3')}>
            <WithTooltip label={t('common.logout')} show={!expanded}>
              <button
                type="button"
                onClick={onLogout}
                className={cn(itemClass, !expanded && 'justify-center px-0')}
              >
                <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
                {expanded ? (
                  <span>{t('common.logout')}</span>
                ) : (
                  <span className="sr-only">{t('common.logout')}</span>
                )}
              </button>
            </WithTooltip>
          </div>
        )}
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
  const [open, setOpen] = useState(true)

  if (!expanded) {
    return <div className="space-y-1 border-t pt-4 first:border-t-0 first:pt-0">{children}</div>
  }

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-md px-1 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
      >
        {title}
        <ChevronUp
          className={cn(
            'h-4 w-4 transition-transform motion-reduce:transition-none',
            !open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
      {open && <div className="space-y-1">{children}</div>}
    </div>
  )
}

export function SidebarItem({
  icon,
  label,
  href,
  expanded = true,
  active = false,
}: {
  icon: React.ReactNode
  label: string
  href: string
  expanded?: boolean
  active?: boolean
}) {
  return (
    <WithTooltip label={label} show={!expanded}>
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={cn(
          itemClass,
          !expanded && 'justify-center px-0',
          active &&
            'nav-active border-transparent font-medium text-link hover:bg-[var(--nav-active-bg)] hover:text-link'
        )}
      >
        {icon}
        {expanded ? (
          <span className="truncate">{label}</span>
        ) : (
          <span className="sr-only">{label}</span>
        )}
      </Link>
    </WithTooltip>
  )
}
