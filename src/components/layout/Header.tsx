'use client'

import * as React from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

interface HeaderProps {
  onSidebarToggle?: () => void
  title?: string
}

export function Header({ onSidebarToggle, title }: HeaderProps) {
  const t = useTranslations()

  return (
    <header className="flex items-center justify-between h-16 px-4 border-b bg-background">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('header.toggleSidebar')}</span>
        </Button>
        <h1 className="text-xl font-semibold">{title || t('header.dashboard')}</h1>
      </div>
    </header>
  )
}
