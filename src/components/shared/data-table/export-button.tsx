'use client'

import { Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type ExportTable, exportToExcel, exportToPDF } from '@/lib/export'

type ExportFormat = 'excel' | 'pdf'

interface ExportButtonProps {
  table: ExportTable
  disabled?: boolean
}

export function ExportButton({ table, disabled = false }: ExportButtonProps) {
  const t = useTranslations('table.export')
  const [isExporting, setIsExporting] = useState<ExportFormat | null>(null)

  const handleExport = async (format: ExportFormat) => {
    if (table.rows.length === 0) {
      toast.error(t('noRows'))
      return
    }

    setIsExporting(format)
    toast.info(t(`${format}Start`))

    try {
      if (format === 'excel') await exportToExcel(table)
      else exportToPDF(table)
      toast.success(t(`${format}Done`))
    } catch {
      toast.error(t(`${format}Error`))
    } finally {
      setIsExporting(null)
    }
  }

  const isDisabled = disabled || table.rows.length === 0 || isExporting !== null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isDisabled} className="gap-2">
          <Download className="h-4 w-4" />
          {t('label')}
          {isExporting && <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('excel')} disabled={isExporting === 'excel'}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          {t('excel')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleExport('pdf')} disabled={isExporting === 'pdf'}>
          <FileText className="mr-2 h-4 w-4" />
          {t('pdf')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
