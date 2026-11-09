import { Activity, FileText, Home, Shield, UserCircle, Users } from 'lucide-react'
import React from 'react'

export interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  badge?: number
  disabled?: boolean
  tabs?: NavigationTab[]
}

export interface NavigationTab {
  labelKey: string
  href: string
}

export interface NavigationCategory {
  id: string
  label: string
  items: NavigationItem[]
}

export interface NavigationSection {
  categories: NavigationCategory[]
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
          icon: React.createElement(Home, { className: 'h-4 w-4' }),
          href: '/dashboard',
        },
        {
          id: 'users',
          label: 'Users',
          icon: React.createElement(Users, { className: 'h-4 w-4' }),
          href: '/dashboard/users',
        },
        {
          id: 'roles',
          label: 'Roles',
          icon: React.createElement(Shield, { className: 'h-4 w-4' }),
          href: '/dashboard/roles',
        },
      ],
    },
    {
      id: 'documents',
      label: 'Documents',
      items: [
        {
          id: 'files',
          label: 'Files',
          icon: React.createElement(FileText, { className: 'h-4 w-4' }),
          href: '/dashboard/files',
        },
        {
          id: 'logs',
          label: 'Logs',
          icon: React.createElement(Activity, { className: 'h-4 w-4' }),
          href: '/dashboard/logs',
        },
      ],
    },
    {
      id: 'account',
      label: 'Account',
      items: [
        {
          id: 'account',
          label: 'Account',
          icon: React.createElement(UserCircle, { className: 'h-4 w-4' }),
          href: '/dashboard/profile',
          tabs: [
            { labelKey: 'common.profile', href: '/dashboard/profile' },
            { labelKey: 'common.settings', href: '/dashboard/settings' },
          ],
        },
      ],
    },
  ],
}

function matchesPath(href: string, path: string) {
  return path === href || (href !== '/dashboard' && path.startsWith(`${href}/`))
}

export function isItemActive(item: NavigationItem, path: string) {
  return [item.href, ...(item.tabs ?? []).map((tab) => tab.href)].some((href) =>
    matchesPath(href, path)
  )
}

export function getActiveTabs(path: string): NavigationTab[] {
  const items = navigationConfig.categories.flatMap((category) => category.items)
  return items.find((item) => isItemActive(item, path))?.tabs ?? []
}
