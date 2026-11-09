'use client'

import { AlertCircle, CheckCircle, Filter, Info, ScrollText, Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { KPICard } from '@/components/dashboard/kpi-card'
import { PageHeader } from '@/components/shared/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyStateLogs } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'

interface LogItem {
  id: string
  level: 'error' | 'warning' | 'info' | 'success'
  message: string
  timestamp: string
  source: string
}

const LEVEL_BADGE = {
  error: 'destructive',
  warning: 'warning',
  info: 'info',
  success: 'success',
} as const

const LEVEL_ICON = {
  error: <AlertCircle className="h-4 w-4 text-destructive" aria-hidden="true" />,
  warning: <AlertCircle className="h-4 w-4 text-warning" aria-hidden="true" />,
  info: <Info className="h-4 w-4 text-info" aria-hidden="true" />,
  success: <CheckCircle className="h-4 w-4 text-success" aria-hidden="true" />,
}

export default function LogsPage() {
  const t = useTranslations('logs')
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [logs] = useState<LogItem[]>([
    {
      id: '1',
      level: 'error',
      message: 'Database connection failed',
      timestamp: '15 minutes ago',
      source: 'Database Service',
    },
    {
      id: '2',
      level: 'warning',
      message: 'High memory usage detected',
      timestamp: '1 hour ago',
      source: 'System Monitor',
    },
    {
      id: '3',
      level: 'info',
      message: 'User john.doe@example.com logged in',
      timestamp: '2 hours ago',
      source: 'Authentication Service',
    },
    {
      id: '4',
      level: 'success',
      message: 'File processing completed successfully',
      timestamp: '3 hours ago',
      source: 'File Processor',
    },
    {
      id: '5',
      level: 'error',
      message: 'API rate limit exceeded',
      timestamp: '5 hours ago',
      source: 'API Gateway',
    },
  ])

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const countByLevel = (level: LogItem['level']) => logs.filter((log) => log.level === level).length

  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title={t('title')}
        description={t('description')}
        breadcrumb={[{ label: t('title') }]}
        actions={
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('export')}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard title={t('kpi.total')} value={logs.length} icon={<ScrollText />} />
        <KPICard title={t('levels.error')} value={countByLevel('error')} icon={<AlertCircle />} />
        <KPICard
          title={t('levels.warning')}
          value={countByLevel('warning')}
          icon={<AlertCircle />}
        />
        <KPICard
          title={t('levels.success')}
          value={countByLevel('success')}
          icon={<CheckCircle />}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder={t('search')}
            aria-label={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          aria-label={t('levelFilter')}
          className="h-11 rounded-xl bg-muted px-3 text-sm text-foreground"
        >
          <option value="all">{t('levels.all')}</option>
          <option value="error">{t('levels.error')}</option>
          <option value="warning">{t('levels.warning')}</option>
          <option value="info">{t('levels.info')}</option>
          <option value="success">{t('levels.success')}</option>
        </select>
      </div>

      {filteredLogs.length === 0 ? (
        <EmptyStateLogs />
      ) : (
        <Card className="divide-y divide-border p-0">
          {filteredLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-3 p-4 sm:px-6">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary-soft">
                {LEVEL_ICON[log.level]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{log.message}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {t('source', { source: log.source })}
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <Badge variant={LEVEL_BADGE[log.level]} className="uppercase">
                  {log.level}
                </Badge>
                <span className="text-xs text-muted-foreground">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}
