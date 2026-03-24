import React from "react"
import { Home, BarChart3, FileText, Settings, Users, Activity, HelpCircle, Search } from "lucide-react"

export interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
  disabled?: boolean
}

export interface NavigationCategory {
  id: string
  label: string
  items: NavigationItem[]
}

export interface NavigationSection {
  categories: NavigationCategory[]
  userItems?: NavigationItem[]
}

export const navigationConfig: NavigationSection = {
  categories: [
    {
      id: 'dashboard',
      label: 'Dashboard',
      items: [
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
      ]
    },
    {
      id: 'documents',
      label: 'Documents',
      items: [
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
      ]
    }
  ],
  userItems: [
    {
      id: 'settings',
      label: 'Settings',
      icon: React.createElement(Settings, { className: "h-4 w-4" }),
      href: '/dashboard/settings'
    },
    {
      id: 'help',
      label: 'Get Help',
      icon: React.createElement(HelpCircle, { className: "h-4 w-4" }),
      href: '/dashboard/help'
    },
    {
      id: 'search',
      label: 'Search',
      icon: React.createElement(Search, { className: "h-4 w-4" }),
      href: '/dashboard/search'
    }
  ]
}

// Legacy support for existing code
export const navigationItems: NavigationItem[] = [
  ...navigationConfig.categories.flatMap(cat => cat.items),
  ...(navigationConfig.userItems || [])
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
