'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface QuickActionCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  buttonText?: string
  className?: string
}

export function QuickActionCard({
  title,
  description,
  icon,
  href,
  buttonText = 'Go',
  className,
}: QuickActionCardProps) {
  return (
    <Card
      glass
      className={cn(
        'group cursor-pointer transition-[box-shadow,border-color] duration-200 hover:border-primary/50 hover:shadow-md motion-reduce:transition-none',
        className
      )}
    >
      <Link href={href} className="block">
        <CardContent className="p-5 sm:p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center size-10 shrink-0 rounded-full border border-primary/30 bg-primary-soft text-link">
                {icon}
              </div>
              <h3 className="font-semibold text-lg">{title}</h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="group/btn p-0 h-auto text-xs text-link hover:bg-transparent"
              >
                <span className="mr-1">{buttonText}</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

interface QuickActionGridProps {
  children: React.ReactNode
  className?: string
}

export function QuickActionGrid({ children, className }: QuickActionGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      {children}
    </div>
  )
}
