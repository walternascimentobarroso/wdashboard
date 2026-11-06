'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { ReactNode } from 'react'
import { SortableHeader } from '@/components/shared/SortableHeader'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { SortDirection } from '@/hooks/useCrudList'
import { RowActions } from './row-actions'

export interface DataTableColumn<T> {
  key: keyof T & string
  label: string
  cell: (item: T) => ReactNode
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  loading: boolean
  visibleColumns: string[]
  sorting: { column: keyof T; direction: SortDirection }
  onSort: (column: keyof T, direction: SortDirection) => void
  onView: (item: T) => void
  onEdit: (item: T) => void
  onDelete: (item: T) => void
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  pageSize: number
  currentPage: number
  totalPages: number
  totalItems: number
}

const MAX_VISIBLE_PAGES = 5

function pageNumbers(currentPage: number, totalPages: number): (number | '…')[] {
  if (totalPages <= MAX_VISIBLE_PAGES) return Array.from({ length: totalPages }, (_, i) => i + 1)

  const pages: (number | '…')[] = [1]
  if (currentPage > 3) pages.push('…')
  const start = Math.max(2, Math.min(currentPage - 1, totalPages - MAX_VISIBLE_PAGES + 3))
  const end = Math.min(totalPages - 1, Math.max(currentPage + 1, MAX_VISIBLE_PAGES - 1))
  for (let i = start; i <= end; i++) pages.push(i)
  if (currentPage < totalPages - 2) pages.push('…')
  pages.push(totalPages)
  return pages
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  loading,
  visibleColumns,
  sorting,
  onSort,
  onView,
  onEdit,
  onDelete,
  onPageChange,
  onPageSizeChange,
  pageSize,
  currentPage,
  totalPages,
  totalItems,
}: DataTableProps<T>) {
  const t = useTranslations('table')
  const shownColumns = columns.filter((column) => visibleColumns.includes(column.key))
  const showActions = visibleColumns.includes('actions')
  const colSpan = shownColumns.length + (showActions ? 1 : 0)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr>
                {shownColumns.map((column) => (
                  <th
                    key={column.key}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                  >
                    <SortableHeader<T>
                      column={{
                        getIsSorted: () =>
                          sorting.column === column.key ? sorting.direction : false,
                      }}
                      title={column.label}
                      onSort={onSort}
                      columnKey={column.key}
                    />
                  </th>
                ))}
                {showActions && (
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    {t('actions.title')}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {loading ? (
                <tr>
                  <td colSpan={colSpan} className="h-24 text-center">
                    <div className="flex items-center justify-center space-x-2" role="status">
                      <div
                        aria-hidden="true"
                        className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"
                      ></div>
                      <span>{t('loading')}</span>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={colSpan} className="h-24 text-center text-muted-foreground">
                    {t('noResults')}
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                    {shownColumns.map((column) => (
                      <td key={column.key} className="p-4 align-middle">
                        {column.cell(item)}
                      </td>
                    ))}
                    {showActions && (
                      <td className="p-4 align-middle">
                        <RowActions
                          onView={() => onView(item)}
                          onEdit={() => onEdit(item)}
                          onDelete={() => onDelete(item)}
                        />
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>{t('showing')}</span>
          <span className="font-medium">
            {totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0}
          </span>
          <span>{t('to')}</span>
          <span className="font-medium">{Math.min(currentPage * pageSize, totalItems)}</span>
          <span>{t('of')}</span>
          <span className="font-medium">{totalItems}</span>
          <span>{t('results')}</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">{t('show')}</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-muted-foreground">{t('perPage')}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label={t('previous')}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>

            <div className="flex items-center space-x-1">
              {pageNumbers(currentPage, totalPages).map((page, index) =>
                page === '…' ? (
                  // biome-ignore lint/suspicious/noArrayIndexKey: ellipsis has no identity besides its position
                  <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                    …
                  </span>
                ) : (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    className="min-w-8 px-2 tabular-nums"
                    aria-current={currentPage === page ? 'page' : undefined}
                    onClick={() => onPageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label={t('next')}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
