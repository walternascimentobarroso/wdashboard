'use client'

import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

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
        <p className="text-xl font-semibold">{title || t('header.dashboard')}</p>
      </div>
    </header>
  )
}
