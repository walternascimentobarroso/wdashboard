import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { User } from '@/features/users/types'
import { transformUserForExport } from '@/lib/export-utils'

export function exportToPDF(users: User[]): void {
  if (users.length === 0) {
    throw new Error('No users to export')
  }

  const doc = new jsPDF()

  // Add title
  doc.setFontSize(16)
  doc.text('Users Report', 14, 15)

  // Transform user data for export
  const exportData = transformUserForExport(users)

  // Add timestamp
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 25)

  // Add table
  autoTable(doc, {
    head: [['Name', 'Email', 'Role', 'Status', 'Created At']],
    body: exportData.map((user) => [user.name, user.email, user.role, user.status, user.createdAt]),
    startY: 35,
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { cellWidth: 40 }, // Name
      1: { cellWidth: 60 }, // Email
      2: { cellWidth: 25 }, // Role
      3: { cellWidth: 25 }, // Status
      4: { cellWidth: 30 }, // Created At
    },
  })

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0]
  const finalFilename = `users-${timestamp}.pdf`

  // Save PDF
  doc.save(finalFilename)
}
