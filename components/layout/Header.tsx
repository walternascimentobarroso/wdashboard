"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useTranslations } from "next-intl"

interface HeaderProps {
  onSidebarToggle?: () => void
  title?: string
}

export function Header({ onSidebarToggle, title }: HeaderProps) {
  const router = useRouter()
  const t = useTranslations()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

  return (
    <header className="flex items-center justify-between h-16 px-4 border-b bg-background">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('header.toggleSidebar')}</span>
        </Button>
        <h1 className="text-xl font-semibold">{title || t('header.dashboard')}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
          {t('common.user')}
        </span>
        <Button variant="outline" onClick={handleLogout}>
          {t('common.logout')}
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}
