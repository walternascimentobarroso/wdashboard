"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Header } from "./Header"
import { Sidebar, SidebarItem, SidebarCategory } from "./Sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useResponsive } from "@/lib/use-responsive"
import { navigationConfig } from "@/lib/navigation"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isMobile } = useResponsive()
  const pathname = usePathname()
  const t = useTranslations()

  // Load saved preferences
  useEffect(() => {
    const saved = localStorage.getItem('dashboard-preferences')
    if (saved) {
      try {
        const prefs = JSON.parse(saved)
        setSidebarExpanded(prefs.sidebarExpanded ?? true)
      } catch (e) {
        console.error('Failed to load preferences:', e)
      }
    }
  }, [])

  // Save preferences
  useEffect(() => {
    const prefs = { sidebarExpanded }
    localStorage.setItem('dashboard-preferences', JSON.stringify(prefs))
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
          <SidebarCategory 
            title={t('navigation.user')} 
            expanded={sidebarExpanded}
          >
            {navigationConfig.userItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={t(`common.${item.id}`)}
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
      <div className={cn("min-h-screen bg-background", className)}>
        <Header onSidebarToggle={handleSidebarToggle} />
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar expanded={true} onToggle={() => setMobileOpen(false)}>
              {renderNavigation()}
            </Sidebar>
          </SheetContent>
        </Sheet>
        <main className="p-4">
          {children}
        </main>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <div className="flex h-screen">
        <Sidebar expanded={sidebarExpanded} onToggle={handleSidebarToggle}>
          {renderNavigation()}
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <Header onSidebarToggle={handleSidebarToggle} />
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
