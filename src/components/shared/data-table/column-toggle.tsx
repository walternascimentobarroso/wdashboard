'use client'

import { Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface ColumnToggleProps {
  columns: { key: string; label: string }[]
  visibleColumns: string[]
  onChange: (visibleColumns: string[]) => void
}

export function ColumnToggle({ columns, visibleColumns, onChange }: ColumnToggleProps) {
  const t = useTranslations('table')
  const allColumns = [...columns, { key: 'actions', label: t('actions.title') }]

  const toggle = (key: string) =>
    onChange(
      visibleColumns.includes(key)
        ? visibleColumns.filter((column) => column !== key)
        : [...visibleColumns, key]
    )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          {t('customizeColumns')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="p-2">
          <p className="text-sm font-medium mb-2">{t('toggleColumns')}</p>
          {allColumns.map((column) => (
            <DropdownMenuItem
              key={column.key}
              className="flex items-center space-x-2 p-2 cursor-pointer"
              onClick={() => toggle(column.key)}
            >
              <input
                type="checkbox"
                checked={visibleColumns.includes(column.key)}
                onChange={() => {}}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm">{column.label}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
