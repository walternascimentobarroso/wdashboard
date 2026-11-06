'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import type * as React from 'react'
import { useEffect, useState } from 'react'
import { CommandPalette } from '@/components/ui/command-palette'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { navigationConfig } from '@/lib/navigation'
import { useResponsive } from '@/lib/use-responsive'
import { cn } from '@/lib/utils'
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

  // Load saved preferences
  useEffect(() => {
    let saved = null
    try {
      saved = localStorage.getItem('dashboard-preferences')
    } catch (error) {
      console.error('Failed to get dashboard preferences:', error)
    }
    if (saved) {
      try {
        const prefs = JSON.parse(saved)
        setSidebarExpanded(prefs.sidebarExpanded ?? true)
      } catch (error) {
        console.error('Failed to load dashboard preferences:', error)
        // Failed to load preferences
      }
    }
  }, [])

  // Save preferences
  useEffect(() => {
    try {
      const prefs = { sidebarExpanded }
      localStorage.setItem('dashboard-preferences', JSON.stringify(prefs))
    } catch (error) {
      console.error('Failed to save dashboard preferences:', error)
    }
  }, [sidebarExpanded])

  // Handle responsive behavior
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

  const renderNavigation = () => {
    return (
      <>
        {/* Main Categories */}
        {navigationConfig.categories.map((category) => (
          <SidebarCategory
            key={category.id}
            title={t(`navigation.${category.id}`)}
            expanded={sidebarExpanded}
          >
            {category.items.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={t(`sidebar.${item.id}`)}
                href={item.href}
                expanded={sidebarExpanded}
                active={pathname === item.href}
              />
            ))}
          </SidebarCategory>
        ))}

        {/* User Items */}
        {navigationConfig.userItems && navigationConfig.userItems.length > 0 && (
          <SidebarCategory title={t('navigation.user')} expanded={sidebarExpanded}>
            {navigationConfig.userItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={t(`sidebar.${item.id}`)}
                href={item.href}
                expanded={sidebarExpanded}
                active={pathname === item.href}
              />
            ))}
          </SidebarCategory>
        )}
      </>
    )
  }

  if (isMobile) {
    return (
      <div className={cn('min-h-screen bg-background', className)}>
        <SkipLink label={t('common.skipToContent')} />
        <Topbar
          onSidebarToggle={handleSidebarToggle}
          onSearchOpen={() => setCommandPaletteOpen(true)}
        />
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar expanded={true} onToggle={() => setMobileOpen(false)}>
              {renderNavigation()}
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
    <div className={cn('min-h-screen bg-background', className)}>
      <SkipLink label={t('common.skipToContent')} />
      <div className="flex h-screen">
        <Sidebar expanded={sidebarExpanded} onToggle={handleSidebarToggle}>
          {renderNavigation()}
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <Topbar
            onSidebarToggle={handleSidebarToggle}
            onSearchOpen={() => setCommandPaletteOpen(true)}
          />
          <main id="main-content" tabIndex={-1} className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
    </div>
  )
}
