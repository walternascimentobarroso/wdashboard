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
import type { User } from '@/features/users/types'
import { exportUsersToExcel, exportUsersToPDF } from '@/lib/export'

interface ExportUsersButtonProps {
  users: User[]
  disabled?: boolean
}

export function ExportUsersButton({ users, disabled = false }: ExportUsersButtonProps) {
  const t = useTranslations('users.export')
  const [isExporting, setIsExporting] = useState<'excel' | 'pdf' | null>(null)

  const handleExportExcel = async () => {
    if (users.length === 0) {
      toast.error(t('noUsers'))
      return
    }

    setIsExporting('excel')
    toast.info(t('excelStart'))

    try {
      await exportUsersToExcel(users)
      toast.success(t('excelDone'))
    } catch (error) {
      console.error('Excel export failed:', error)
      toast.error(t('excelError'))
    } finally {
      setIsExporting(null)
    }
  }

  const handleExportPDF = async () => {
    if (users.length === 0) {
      toast.error(t('noUsers'))
      return
    }

    setIsExporting('pdf')
    toast.info(t('pdfStart'))

    try {
      exportUsersToPDF(users)
      toast.success(t('pdfDone'))
    } catch (error) {
      console.error('PDF export failed:', error)
      toast.error(t('pdfError'))
    } finally {
      setIsExporting(null)
    }
  }

  const isDisabled = disabled || users.length === 0 || isExporting !== null

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
        <DropdownMenuItem onClick={handleExportExcel} disabled={isExporting === 'excel'}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          {t('excel')}
          {isExporting === 'excel' && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportPDF} disabled={isExporting === 'pdf'}>
          <FileText className="mr-2 h-4 w-4" />
          {t('pdf')}
          {isExporting === 'pdf' && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
