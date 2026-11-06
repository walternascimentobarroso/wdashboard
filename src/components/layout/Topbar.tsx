'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, Search, Sun, Moon, Bell, User, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/modules/auth/components/AuthProvider'
import { useTheme } from 'next-themes'

interface TopbarProps {
  onSidebarToggle?: () => void
  title?: string
  onSearchOpen?: () => void
}

export function Topbar({ onSidebarToggle, title, onSearchOpen }: TopbarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const t = useTranslations()
  const { theme, setTheme } = useTheme()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
      router.push('/login')
    }
  }

  const userName = user?.name || 'shadcn'
  const userEmail = user?.email || 'm@example.com'
  const userAvatar = user?.avatar || undefined

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      onSearchOpen?.()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onSearchOpen])

  return (
    <header className="flex items-center justify-between h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t('header.toggleSidebar')}</span>
        </Button>
        <h1 className="text-xl font-semibold">{title || t('header.dashboard')}</h1>
      </div>

      <div className="flex items-center space-x-2">
        {/* Search */}
        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground"
          onClick={onSearchOpen}
        >
          <Search className="h-4 w-4" />
          <span>{t('search.placeholder')}</span>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="h-9 w-9"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t('theme.toggle')}</span>
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              <span className="sr-only">{t('notifications.title')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-sm font-semibold">{t('notifications.title')}</h3>
              <Button variant="ghost" size="sm" className="text-xs">
                {t('notifications.markAllRead')}
              </Button>
            </div>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem asChild className="cursor-pointer">
                <div className="flex items-start space-x-3 p-2">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">File uploaded successfully</p>
                    <p className="text-xs text-muted-foreground">report.pdf was uploaded</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <div className="flex items-start space-x-3 p-2">
                  <div className="h-2 w-2 bg-red-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Error detected</p>
                    <p className="text-xs text-muted-foreground">Failed to process user data</p>
                    <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <div className="flex items-start space-x-3 p-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New user created</p>
                    <p className="text-xs text-muted-foreground">john.doe@example.com joined</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href="/dashboard/notifications"
                className="w-full text-center text-sm text-muted-foreground"
              >
                {t('notifications.viewAll')}
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-medium">{userName}</p>
                <p className="w-[200px] truncate text-sm text-muted-foreground">{userEmail}</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                {t('common.profile')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                {t('common.settings')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onSelect={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              {t('common.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
