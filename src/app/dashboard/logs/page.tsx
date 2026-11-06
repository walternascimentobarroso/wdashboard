'use client'

import { useState } from 'react'
import { Search, Filter, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { EmptyStateLogs } from '@/components/ui/empty-state'

interface LogItem {
  id: string
  level: 'error' | 'warning' | 'info' | 'success'
  message: string
  timestamp: string
  source: string
}

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState<string>('all')
  const [logs] = useState<LogItem[]>([
    {
      id: '1',
      level: 'error',
      message: 'Database connection failed',
      timestamp: '15 minutes ago',
      source: 'Database Service'
    },
    {
      id: '2',
      level: 'warning',
      message: 'High memory usage detected',
      timestamp: '1 hour ago',
      source: 'System Monitor'
    },
    {
      id: '3',
      level: 'info',
      message: 'User john.doe@example.com logged in',
      timestamp: '2 hours ago',
      source: 'Authentication Service'
    },
    {
      id: '4',
      level: 'success',
      message: 'File processing completed successfully',
      timestamp: '3 hours ago',
      source: 'File Processor'
    },
    {
      id: '5',
      level: 'error',
      message: 'API rate limit exceeded',
      timestamp: '5 hours ago',
      source: 'API Gateway'
    }
  ])

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'destructive'
      case 'warning':
        return 'secondary'
      case 'success':
        return 'default'
      default:
        return 'outline'
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Logs' }]} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Logs</h1>
          <p className="text-muted-foreground">Monitor system activity and events</p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 border border rounded-md bg-background text-sm"
            >
              <option value="all">All Levels</option>
              <option value="error">Errors</option>
              <option value="warning">Warnings</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Logs List */}
      <div className="space-y-4">
        {filteredLogs.length === 0 ? (
          <EmptyStateLogs onRefresh={() => console.warn('Refresh logs clicked')} />
        ) : (
          filteredLogs.map((log) => (
            <Card key={log.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getLevelIcon(log.level)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={getLevelColor(log.level)}>
                        {log.level.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{log.message}</p>
                    <p className="text-xs text-muted-foreground">
                      Source: {log.source}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
