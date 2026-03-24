'use client'

import { useState } from 'react'
import { Download, FileSpreadsheet, FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { exportUsersToExcel, exportUsersToPDF } from '@/lib/export'
import { User } from '@/features/users/types'
import { toast } from 'sonner'

interface ExportUsersButtonProps {
  users: User[]
  disabled?: boolean
}

export function ExportUsersButton({ users, disabled = false }: ExportUsersButtonProps) {
  const [isExporting, setIsExporting] = useState<'excel' | 'pdf' | null>(null)

  const handleExportExcel = async () => {
    if (users.length === 0) {
      toast.error('No users to export')
      return
    }

    setIsExporting('excel')
    toast.info('Starting Excel export...')

    try {
      await exportUsersToExcel(users)
      toast.success('Excel export completed successfully!')
    } catch (error) {
      console.error('Excel export failed:', error)
      toast.error('Failed to export to Excel. Please try again.')
    } finally {
      setIsExporting(null)
    }
  }

  const handleExportPDF = async () => {
    if (users.length === 0) {
      toast.error('No users to export')
      return
    }

    setIsExporting('pdf')
    toast.info('Starting PDF export...')

    try {
      exportUsersToPDF(users)
      toast.success('PDF export completed successfully!')
    } catch (error) {
      console.error('PDF export failed:', error)
      toast.error('Failed to export to PDF. Please try again.')
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
          Export
          {isExporting && <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportExcel} disabled={isExporting === 'excel'}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as Excel
          {isExporting === 'excel' && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleExportPDF} disabled={isExporting === 'pdf'}>
          <FileText className="mr-2 h-4 w-4" />
          Export as PDF
          {isExporting === 'pdf' && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
