import ExcelJS from 'exceljs'
import { User } from '@/features/users/types'
import { transformUserForExport } from '@/lib/export-utils'

export async function exportUsersToExcel(users: User[], filename?: string): Promise<void> {
  if (users.length === 0) {
    throw new Error('No users to export')
  }

  // Create a new workbook
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Users')

  // Add columns
  worksheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Role', key: 'role', width: 15 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Created At', key: 'createdAt', width: 15 },
  ]

  // Transform user data for export and add rows
  const exportData = transformUserForExport(users)
  worksheet.addRows(exportData)

  // Style the header row
  const headerRow = worksheet.getRow(1)
  headerRow.font = { bold: true }
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFE6E6E6' },
  }

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0]
  const finalFilename = filename || `users-${timestamp}.xlsx`

  // Write to buffer and download
  const buffer = await workbook.xlsx.writeBuffer()

  // Create download link
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = finalFilename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
