'use client'

import { Filter, Search, Upload } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: t('title') }]} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">{t('description')}</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
          {t('upload')}
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('search')}
                aria-label={t('search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
              {t('filter')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <div className="space-y-4">
        {filteredFiles.length === 0 ? (
          <EmptyStateFiles />
        ) : (
          filteredFiles.map((file) => (
            <Card key={file.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                      <span className="text-xs font-medium text-primary">
                        {file.type.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{file.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {file.size} • {file.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'uploading' && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                    )}
                    {file.status === 'completed' && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )}
                    {file.status === 'error' && <div className="w-2 h-2 bg-red-500 rounded-full" />}
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
