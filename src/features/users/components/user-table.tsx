'use client'

import {
  type Column,
  type ColumnDef,
  type Row,
  rowSortingFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import { SortableHeader } from '@/components/shared/SortableHeader'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { User } from '../types'
import { UserActions } from './user-actions'

const features = tableFeatures({ rowSortingFeature })
type Features = typeof features

interface UserTableProps {
  users: User[]
  loading: boolean
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  onSort: (column: keyof User, direction: 'asc' | 'desc') => void
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  pageSize: number
  currentPage: number
  totalPages: number
  totalItems: number
  visibleColumns: string[]
}

export function UserTable({
  users,
  loading,
  onEdit,
  onDelete,
  onSort,
  onPageChange,
  onPageSizeChange,
  pageSize,
  currentPage,
  totalPages,
  totalItems,
  visibleColumns,
}: UserTableProps) {
  const t = useTranslations()
  const format = useFormatter()

  const columns: ColumnDef<Features, User>[] = [
    {
      accessorKey: 'name',
      header: ({ column }: { column: Column<Features, User> }) => (
        <SortableHeader
          column={column}
          title={t('users.columns.name')}
          onSort={onSort}
          columnKey="name"
        />
      ),
      cell: ({ row }: { row: Row<Features, User> }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }: { column: Column<Features, User> }) => (
        <SortableHeader
          column={column}
          title={t('users.columns.email')}
          onSort={onSort}
          columnKey="email"
        />
      ),
      cell: ({ row }: { row: Row<Features, User> }) => (
        <div className="text-sm text-muted-foreground">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'role',
      header: ({ column }: { column: Column<Features, User> }) => (
        <SortableHeader
          column={column}
          title={t('users.columns.role')}
          onSort={onSort}
          columnKey="role"
        />
      ),
      cell: ({ row }: { row: Row<Features, User> }) => {
        const role = row.getValue('role') as string
        return (
          <div className="capitalize">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                role === 'admin'
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                  : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
              }`}
            >
              {role}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'status',
      header: ({ column }: { column: Column<Features, User> }) => (
        <SortableHeader
          column={column}
          title={t('users.columns.status')}
          onSort={onSort}
          columnKey="status"
        />
      ),
      cell: ({ row }: { row: Row<Features, User> }) => {
        const status = row.getValue('status') as string
        return (
          <div className="capitalize">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                status === 'active'
                  ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
              }`}
            >
              {status}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }: { column: Column<Features, User> }) => (
        <SortableHeader
          column={column}
          title={t('users.columns.created')}
          onSort={onSort}
          columnKey="createdAt"
        />
      ),
      cell: ({ row }: { row: Row<Features, User> }) => {
        const date = new Date(row.getValue('createdAt'))
        return (
          <div className="text-sm text-muted-foreground">
            {format.dateTime(date, { dateStyle: 'medium' })}
          </div>
        )
      },
    },
    {
      id: 'actions',
      header: t('users.columns.actions'),
      cell: ({ row }: { row: Row<Features, User> }) => {
        const user = row.original
        return (
          <UserActions user={user} onEdit={() => onEdit(user)} onDelete={() => onDelete(user)} />
        )
      },
    },
  ].filter((col) => visibleColumns.includes(col.accessorKey || col.id || ''))

  const table = useTable({ features, data: users, columns, manualSorting: true })

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="h-12 px-4 text-left align-middle font-medium text-muted-foreground"
                    >
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    <div className="flex items-center justify-center space-x-2" role="status">
                      <div
                        aria-hidden="true"
                        className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"
                      ></div>
                      <span>{t('users.table.loading')}</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    {t('users.table.noUsers')}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    {row.getAllCells().map((cell) => (
                      <td key={cell.id} className="p-4 align-middle has-[[role=checkbox]]:pr-0">
                        <table.FlexRender cell={cell} />
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 sm:space-x-2 py-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>{t('users.table.showing')}</span>
          <span className="font-medium">
            {totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0}
          </span>
          <span>{t('users.table.to')}</span>
          <span className="font-medium">{Math.min(currentPage * pageSize, totalItems)}</span>
          <span>{t('users.table.of')}</span>
          <span className="font-medium">{totalItems}</span>
          <span>{t('users.table.results')}</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Page Size Selector */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">{t('users.table.show')}</span>
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
            <span className="text-muted-foreground">{t('users.table.perPage')}</span>
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              aria-label={t('users.table.previous')}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>

            <div className="flex items-center space-x-1">
              {/* Show limited page numbers with ellipsis */}
              {(() => {
                const pages = []
                const maxVisiblePages = 5

                if (totalPages <= maxVisiblePages) {
                  // Show all pages if total is small
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(i)
                  }
                } else {
                  // Show first page, current page, and last page with ellipsis
                  pages.push(1)

                  if (currentPage > 3) {
                    pages.push('…')
                  }

                  const start = Math.max(
                    2,
                    Math.min(currentPage - 1, totalPages - maxVisiblePages + 3)
                  )
                  const end = Math.min(
                    totalPages - 1,
                    Math.max(currentPage + 1, maxVisiblePages - 1)
                  )

                  for (let i = start; i <= end; i++) {
                    if (i !== 1 && i !== totalPages) {
                      pages.push(i)
                    }
                  }

                  if (currentPage < totalPages - 2) {
                    pages.push('…')
                  }

                  if (totalPages > 1) {
                    pages.push(totalPages)
                  }
                }

                return pages.map((page, index) =>
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
                      onClick={() => onPageChange(page as number)}
                    >
                      {page}
                    </Button>
                  )
                )
              })()}
            </div>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              aria-label={t('users.table.next')}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
