'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type * as React from 'react'
import { useEffect, useState } from 'react'
import { CommandPalette } from '@/components/ui/command-palette'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { isItemActive, navigationConfig } from '@/lib/navigation'
import { readJson } from '@/lib/read-json'
import { useResponsive } from '@/lib/use-responsive'
import { cn } from '@/lib/utils'
import { useAuth } from '@/modules/auth/components/AuthProvider'
import { Sidebar, SidebarCategory, SidebarItem } from './Sidebar'
import { Topbar } from './Topbar'

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:ring-2 focus:ring-ring"
    >
      {label}
    </a>
  )
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const { isMobile } = useResponsive()
  const pathname = usePathname()
  const t = useTranslations()
  const router = useRouter()
  const { logout } = useAuth()

  useEffect(() => {
    const prefs = readJson<{ sidebarExpanded?: boolean } | null>('dashboard-preferences', null)
    if (prefs) setSidebarExpanded(prefs.sidebarExpanded ?? true)
  }, [])

  useEffect(() => {
    try {
      const prefs = { sidebarExpanded }
      localStorage.setItem('dashboard-preferences', JSON.stringify(prefs))
    } catch (error) {
      console.error('Failed to save dashboard preferences:', error)
    }
  }, [sidebarExpanded])

  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false)
    }
  }, [isMobile])

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen)
    } else {
      setSidebarExpanded(!sidebarExpanded)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } finally {
      router.push('/login')
    }
  }

  const renderNavigation = (expanded: boolean) =>
    navigationConfig.categories.map((category) => (
      <SidebarCategory key={category.id} title={t(`navigation.${category.id}`)} expanded={expanded}>
        {category.items.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={t(`sidebar.${item.id}`)}
            href={item.href}
            expanded={expanded}
            active={isItemActive(item, pathname)}
          />
        ))}
      </SidebarCategory>
    ))

  const topbar = (
    <Topbar
      onSidebarToggle={handleSidebarToggle}
      onSearchOpen={() => setCommandPaletteOpen(true)}
    />
  )

  if (isMobile) {
    return (
      <div className={cn('min-h-screen', className)}>
        <SkipLink label={t('common.skipToContent')} />
        {topbar}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar expanded className="w-full border-r-0" onLogout={handleLogout}>
              {renderNavigation(true)}
            </Sidebar>
          </SheetContent>
        </Sheet>
        <main id="main-content" tabIndex={-1} className="p-4">
          {children}
        </main>
        <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
      </div>
    )
  }

  return (
    <div className={cn('h-screen p-3', className)}>
      <SkipLink label={t('common.skipToContent')} />
      <div className="flex h-full overflow-hidden rounded-2xl border bg-background/30 shadow-sm">
        <Sidebar expanded={sidebarExpanded} onLogout={handleLogout}>
          {renderNavigation(sidebarExpanded)}
        </Sidebar>
        <div className="flex min-w-0 flex-1 flex-col">
          {topbar}
          <main id="main-content" tabIndex={-1} className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </div>
  )
}
