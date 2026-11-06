'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const t = useTranslations()

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-1 text-sm', className)}>
      <Link
        href="/dashboard"
        className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">{t('breadcrumb.home')}</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

interface BreadcrumbSeparatorProps {
  children?: React.ReactNode
}

export function BreadcrumbSeparator({ children }: BreadcrumbSeparatorProps) {
  return <span className="mx-2 text-muted-foreground">{children || '/'}</span>
}

interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  isLast?: boolean
}

export function BreadcrumbListItem({ isLast, children, className, ...props }: BreadcrumbItemProps) {
  return (
    <li
      className={cn(
        'flex items-center',
        isLast && 'text-foreground font-medium',
        !isLast && 'text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
}

interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {}

export function BreadcrumbList({ className, ...props }: BreadcrumbListProps) {
  return <ol className={cn('flex items-center space-x-1 text-sm', className)} {...props} />
}

interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function BreadcrumbPage({ className, ...props }: BreadcrumbPageProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn('font-normal text-foreground', className)}
      {...props}
    />
  )
}

interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? 'span' : 'a'

    return (
      <Comp
        ref={ref}
        className={cn('transition-colors hover:text-foreground', className)}
        {...props}
      />
    )
  }
)
BreadcrumbLink.displayName = 'BreadcrumbLink'
