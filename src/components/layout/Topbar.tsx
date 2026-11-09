'use client'

import {
  Bell,
  ChevronDown,
  LogOut,
  Moon,
  PanelLeft,
  Search,
  Settings,
  Sun,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import * as React from 'react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getActiveTabs } from '@/lib/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/modules/auth/components/AuthProvider'

const NOTIFICATIONS = [
  { key: 'fileUploaded', dotClass: 'bg-info' },
  { key: 'errorDetected', dotClass: 'bg-destructive' },
  { key: 'userCreated', dotClass: 'bg-success' },
] as const

interface TopbarProps {
  onSidebarToggle?: () => void
  onSearchOpen?: () => void
}

export function Topbar({ onSidebarToggle, onSearchOpen }: TopbarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const t = useTranslations()
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const tabs = getActiveTabs(pathname)

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      router.push('/login')
    }
  }

  const userName = user?.name || 'shadcn'
  const userEmail = user?.email || 'm@example.com'
  const userAvatar = user?.avatar || undefined

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onSearchOpen?.()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onSearchOpen])

  return (
    <header className="flex h-[72px] shrink-0 items-center gap-2 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" onClick={onSidebarToggle} className="h-10 w-10 shrink-0">
        <PanelLeft className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">{t('header.toggleSidebar')}</span>
      </Button>

      <nav className="hidden h-full items-stretch gap-6 md:ml-4 md:flex">
        {tabs.map((tab) => {
          const active = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center border-b-2 px-1 text-sm transition-colors',
                active
                  ? 'border-primary font-medium text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {t(tab.labelKey)}
            </Link>
          )
        })}
      </nav>

      <div className="ml-auto flex items-center gap-1 md:gap-2">
        <button
          type="button"
          onClick={onSearchOpen}
          className="flex h-10 items-center gap-2 rounded-full bg-muted px-3 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:w-64 md:px-4"
        >
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="hidden truncate md:inline">{t('search.placeholder')}</span>
          <span className="sr-only md:hidden">{t('search.placeholder')}</span>
          <kbd className="ml-auto hidden rounded border bg-background px-1.5 font-mono text-[10px] lg:inline">
            ⌘K
          </kbd>
        </button>
        <LanguageSwitcher />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="h-10 w-10 rounded-xl"
        >
          <Sun
            className="h-4 w-4 rotate-0 scale-100 transition-transform motion-reduce:transition-none dark:-rotate-90 dark:scale-0"
            aria-hidden="true"
          />
          <Moon
            className="absolute h-4 w-4 rotate-90 scale-0 transition-transform motion-reduce:transition-none dark:rotate-0 dark:scale-100"
            aria-hidden="true"
          />
          <span className="sr-only">{t('theme.toggle')}</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-xl">
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"
              />
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
              {NOTIFICATIONS.map(({ key, dotClass }) => (
                <DropdownMenuItem key={key} asChild className="cursor-pointer">
                  <div className="flex items-start space-x-3 p-2">
                    <div aria-hidden="true" className={`h-2 w-2 rounded-full mt-2 ${dotClass}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{t(`notifications.items.${key}.title`)}</p>
                      <p className="text-xs text-muted-foreground">
                        {t(`notifications.items.${key}.description`)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t(`notifications.items.${key}.time`)}
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-11 gap-2 rounded-xl px-1.5 md:pr-2">
              <Avatar className="h-9 w-9 rounded-xl">
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="rounded-xl">
                  {userName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-32 truncate text-sm font-medium lg:inline">
                {userName}
              </span>
              <ChevronDown
                className="hidden h-4 w-4 text-muted-foreground lg:block"
                aria-hidden="true"
              />
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
                <User className="mr-2 h-4 w-4" aria-hidden="true" />
                {t('common.profile')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
                {t('common.settings')}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onSelect={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              {t('common.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
