'use client'

import { CheckCircle, FileText, Filter, Loader, Search, Upload } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { KPICard } from '@/components/dashboard/kpi-card'
import { PageHeader } from '@/components/shared/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { EmptyStateFiles } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'

interface FileItem {
  id: string
  name: string
  type: string
  size: string
  uploadedAt: string
  status: 'uploading' | 'completed' | 'error'
}

const STATUS_BADGE = {
  completed: 'success',
  uploading: 'warning',
  error: 'destructive',
} as const

export default function FilesPage() {
  const t = useTranslations('files')
  const [searchTerm, setSearchTerm] = useState('')
  const [files] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Annual Report 2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedAt: '2 hours ago',
      status: 'completed',
    },
    {
      id: '2',
      name: 'Budget Analysis.xlsx',
      type: 'Excel',
      size: '856 KB',
      uploadedAt: '1 day ago',
      status: 'completed',
    },
    {
      id: '3',
      name: 'Presentation.pptx',
      type: 'PowerPoint',
      size: '5.2 MB',
      uploadedAt: '3 days ago',
      status: 'uploading',
    },
  ])

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const countByStatus = (status: FileItem['status']) =>
    files.filter((file) => file.status === status).length

  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title={t('title')}
        description={t('description')}
        breadcrumb={[{ label: t('title') }]}
        actions={
          <Button>
            <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
            {t('upload')}
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <KPICard title={t('kpi.total')} value={files.length} icon={<FileText />} />
        <KPICard
          title={t('status.completed')}
          value={countByStatus('completed')}
          icon={<CheckCircle />}
        />
        <KPICard
          title={t('status.uploading')}
          value={countByStatus('uploading')}
          icon={<Loader />}
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
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
          {t('filter')}
        </Button>
      </div>

      {filteredFiles.length === 0 ? (
        <EmptyStateFiles />
      ) : (
        <Card className="divide-y divide-border p-0">
          {filteredFiles.map((file) => (
            <div key={file.id} className="flex items-center gap-4 p-4 sm:px-6">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary-soft text-xs font-semibold text-link">
                {file.type.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {file.type} • {file.size} • {file.uploadedAt}
                </p>
              </div>
              <Badge variant={STATUS_BADGE[file.status]} className="shrink-0">
                {t(`status.${file.status}`)}
              </Badge>
            </div>
          ))}
        </Card>
      )}
    </div>
  )
}
