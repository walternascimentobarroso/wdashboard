import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { ExportTable } from '.'

export function exportToPDF({ title, filename, columns, rows }: ExportTable): void {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text(title, 14, 15)
  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 25)

  autoTable(doc, {
    head: [columns.map((column) => column.header)],
    body: rows.map((row) => columns.map((column) => row[column.key])),
    startY: 35,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [59, 130, 246], textColor: 255 },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  })

  doc.save(`${filename}-${new Date().toISOString().split('T')[0]}.pdf`)
}
