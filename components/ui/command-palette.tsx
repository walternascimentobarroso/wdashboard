'use client'

import * as React from 'react'
import { Command } from 'cmdk'
import { Search, Users, FileText, Activity } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useTranslations } from 'next-intl'

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface SearchResult {
  id: string
  title: string
  description: string
  type: 'user' | 'file' | 'log' | 'action'
  icon: React.ReactNode
  action?: () => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const t = useTranslations()
  const [search, setSearch] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Mock search results
  const searchResults: SearchResult[] = [
    {
      id: 'user-1',
      title: 'John Doe',
      description: 'john.doe@example.com • Active user',
      type: 'user',
      icon: <Users className="h-4 w-4" />,
      action: () => console.warn('Navigate to user John Doe'),
    },
    {
      id: 'user-2',
      title: 'Jane Smith',
      description: 'jane.smith@example.com • Admin user',
      type: 'user',
      icon: <Users className="h-4 w-4" />,
      action: () => console.warn('Navigate to user Jane Smith'),
    },
    {
      id: 'file-1',
      title: 'Annual Report 2024',
      description: 'PDF • 2.4 MB • Uploaded 2 hours ago',
      type: 'file',
      icon: <FileText className="h-4 w-4" />,
      action: () => console.warn('Navigate to file Annual Report'),
    },
    {
      id: 'file-2',
      title: 'Budget Analysis',
      description: 'Excel • 856 KB • Uploaded yesterday',
      type: 'file',
      icon: <FileText className="h-4 w-4" />,
      action: () => console.warn('Navigate to file Budget Analysis'),
    },
    {
      id: 'log-1',
      title: 'System Error Log',
      description: 'Error • Database connection failed • 15 min ago',
      type: 'log',
      icon: <Activity className="h-4 w-4" />,
      action: () => console.warn('Navigate to error log'),
    },
    {
      id: 'log-2',
      title: 'User Activity Log',
      description: 'Info • 150 active sessions • 1 hour ago',
      type: 'log',
      icon: <Activity className="h-4 w-4" />,
      action: () => console.warn('Navigate to activity log'),
    },
  ]

  const filteredResults = React.useMemo(() => {
    if (!search) return []

    const lowercaseSearch = search.toLowerCase()
    return searchResults.filter(
      (result) =>
        result.title.toLowerCase().includes(lowercaseSearch) ||
        result.description.toLowerCase().includes(lowercaseSearch)
    )
  }, [search])

  const handleSelect = (result: SearchResult) => {
    result.action?.()
    onOpenChange(false)
    setSearch('')
  }

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden max-w-2xl">
        <DialogTitle className="sr-only">{t('search.placeholder')}</DialogTitle>
        <DialogDescription className="sr-only">
          Search for users, files, and system logs. Use keyboard navigation to select results.
        </DialogDescription>
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Input
              ref={inputRef}
              placeholder={t('search.placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-0 focus:ring-0 focus-visible:ring-0"
            />
          </div>

          <Command.List className="max-h-[450px] overflow-y-auto p-2">
            {!search && (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                {t('search.empty')}
              </div>
            )}

            {search && filteredResults.length === 0 && (
              <div className="px-2 py-4 text-center text-sm text-muted-foreground">
                {t('search.noResults')}
              </div>
            )}

            {search && filteredResults.length > 0 && (
              <>
                {['user', 'file', 'log'].map((type) => {
                  const typeResults = filteredResults.filter((r) => r.type === type)
                  if (typeResults.length === 0) return null

                  return (
                    <Command.Group key={type} heading={t(`search.categories.${type}`)}>
                      {typeResults.map((result) => (
                        <Command.Item
                          key={result.id}
                          onSelect={() => handleSelect(result)}
                          className="flex items-center gap-3 px-2 py-3 rounded-sm cursor-pointer hover:bg-accent"
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted">
                            {result.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{result.title}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {result.description}
                            </div>
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )
                })}
              </>
            )}
          </Command.List>

          {search && filteredResults.length > 0 && (
            <div className="border-t p-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <kbd className="inline-flex items-center justify-center rounded border bg-muted px-1 font-mono text-[10px]">
                  ↑↓
                </kbd>
                <span>{t('search.navigate')}</span>
                <kbd className="inline-flex items-center justify-center rounded border bg-muted px-1 font-mono text-[10px]">
                  ↵
                </kbd>
                <span>{t('search.select')}</span>
                <kbd className="inline-flex items-center justify-center rounded border bg-muted px-1 font-mono text-[10px]">
                  ESC
                </kbd>
                <span>{t('search.close')}</span>
              </div>
            </div>
          )}
        </Command>
      </DialogContent>
    </Dialog>
  )
}
