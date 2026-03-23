"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useResponsive } from "@/lib/use-responsive"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isMobile } = useResponsive()

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

  if (isMobile) {
    return (
      <div className={cn("min-h-screen bg-background", className)}>
        <Header onSidebarToggle={handleSidebarToggle} />
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar expanded={true} onToggle={() => setMobileOpen(false)}>
              {/* Navigation items will go here */}
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
          {/* Navigation items will go here */}
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
