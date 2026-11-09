import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

interface SortableHeaderProps<T> {
  column: { getIsSorted: () => false | 'asc' | 'desc' }
  title: string
  onSort: (column: keyof T, direction: 'asc' | 'desc') => void
  columnKey: keyof T
}

export function SortableHeader<T>({ column, title, onSort, columnKey }: SortableHeaderProps<T>) {
  return (
    <button
      type="button"
      className="flex items-center gap-1.5 uppercase tracking-wide hover:text-foreground"
      onClick={() => onSort(columnKey, column.getIsSorted() === 'asc' ? 'desc' : 'asc')}
    >
      {title}
      {column.getIsSorted() === 'asc' ? (
        <ArrowUp className="size-3.5" aria-hidden="true" />
      ) : column.getIsSorted() === 'desc' ? (
        <ArrowDown className="size-3.5" aria-hidden="true" />
      ) : (
        <ArrowUpDown className="size-3.5" aria-hidden="true" />
      )}
    </button>
  )
}
