export interface ExportColumn {
  key: string
  header: string
}

export interface ExportTable {
  title: string
  filename: string
  columns: ExportColumn[]
  rows: Record<string, string>[]
}

export { exportToExcel } from './export-excel'
export { exportToPDF } from './export-pdf'
