'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

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
      className={cn(
        'group cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] border-border/50 hover:border-border glass',
        className
      )}
    >
      <Link href={href} className="block">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Icon and Title */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                {icon}
              </div>
              <h3 className="font-semibold text-lg">{title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>

            {/* Action Button */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="group/btn p-0 h-auto text-primary hover:bg-transparent"
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
