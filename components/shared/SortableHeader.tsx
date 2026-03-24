import { Column } from '@tanstack/react-table'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'

interface SortableHeaderProps<T> {
  column: Column<T>
  title: string
  onSort: (column: keyof T, direction: 'asc' | 'desc') => void
  columnKey: keyof T
}

export function SortableHeader<T>({ column, title, onSort, columnKey }: SortableHeaderProps<T>) {
  return (
    <button
      className="flex items-center hover:text-muted-foreground"
      onClick={() => onSort(columnKey, column.getIsSorted() === 'asc' ? 'desc' : 'asc')}
    >
      {title}
      {column.getIsSorted() === 'asc' ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : column.getIsSorted() === 'desc' ? (
        <ArrowDown className="ml-2 h-4 w-4" />
      ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
      )}
    </button>
  )
}
