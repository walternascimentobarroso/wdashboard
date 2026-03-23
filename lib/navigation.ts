import React from "react"
import { Home, BarChart3, FileText, Settings, Users, Upload, Activity } from "lucide-react"

export interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
  disabled?: boolean
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: React.createElement(Home, { className: "h-4 w-4" }),
    href: '/dashboard'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: React.createElement(BarChart3, { className: "h-4 w-4" }),
    href: '/dashboard/analytics'
  },
  {
    id: 'users',
    label: 'Users',
    icon: React.createElement(Users, { className: "h-4 w-4" }),
    href: '/dashboard/users'
  },
  {
    id: 'files',
    label: 'Files',
    icon: React.createElement(FileText, { className: "h-4 w-4" }),
    href: '/dashboard/files'
  },
  {
    id: 'logs',
    label: 'Logs',
    icon: React.createElement(Activity, { className: "h-4 w-4" }),
    href: '/dashboard/logs'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: React.createElement(Settings, { className: "h-4 w-4" }),
    href: '/dashboard/settings'
  }
]

export function getActiveItem(currentPath: string): string | null {
  // Remove trailing slash for consistent matching
  const normalizedPath = currentPath.replace(/\/$/, '')
  
  // Find exact match first
  const exactMatch = navigationItems.find(item => 
    item.href.replace(/\/$/, '') === normalizedPath
  )
  
  if (exactMatch) return exactMatch.id
  
  // Find partial match for nested routes
  const partialMatch = navigationItems.find(item => 
    normalizedPath.startsWith(item.href.replace(/\/$/, '')) && item.href !== '/dashboard'
  )
  
  return partialMatch?.id || null
}
