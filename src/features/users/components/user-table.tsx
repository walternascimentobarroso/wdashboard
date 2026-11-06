'use client'

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  Column,
  Row,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { User } from '../types'
import { UserActions } from './user-actions'
import { SortableHeader } from '@/components/shared/SortableHeader'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useTranslations } from 'next-intl'

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

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: ({ column }: { column: Column<User> }) => (
        <SortableHeader
          column={column}
          title={t('users.columns.name')}
          onSort={onSort}
          columnKey="name"
        />
      ),
      cell: ({ row }: { row: Row<User> }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }: { column: Column<User> }) => (
        <SortableHeader
          column={column}
          title={t('users.columns.email')}
          onSort={onSort}
          columnKey="email"
        />
      ),
      cell: ({ row }: { row: Row<User> }) => (
        <div className="text-sm text-muted-foreground">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'role',
      header: ({ column }: { column: Column<User> }) => (
        <SortableHeader
          column={column}
          title={t('users.columns.role')}
          onSort={onSort}
          columnKey="role"
        />
      ),
      cell: ({ row }: { row: Row<User> }) => {
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
      header: ({ column }: { column: Column<User> }) => (
        <SortableHeader
          column={column}
          title={t('users.columns.status')}
          onSort={onSort}
          columnKey="status"
        />
      ),
      cell: ({ row }: { row: Row<User> }) => {
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
      header: ({ column }: { column: Column<User> }) => (
        <SortableHeader
          column={column}
          title={t('users.columns.created')}
          onSort={onSort}
          columnKey="createdAt"
        />
      ),
      cell: ({ row }: { row: Row<User> }) => {
        const date = new Date(row.getValue('createdAt'))
        return <div className="text-sm text-muted-foreground">{date.toLocaleDateString()}</div>
      },
    },
    {
      id: 'actions',
      header: t('users.columns.actions'),
      cell: ({ row }: { row: Row<User> }) => {
        const user = row.original
        return (
          <UserActions user={user} onEdit={() => onEdit(user)} onDelete={() => onDelete(user)} />
        )
      },
    },
  ].filter((col) => visibleColumns.includes(col.accessorKey || col.id || ''))

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
  })

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
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span>Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

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
                    pages.push('...')
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
                    pages.push('...')
                  }

                  if (totalPages > 1) {
                    pages.push(totalPages)
                  }
                }

                return pages.map((page, index) =>
                  page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 min-w-[2rem] px-2 ${
                        currentPage === page
                          ? 'bg-primary text-primary-foreground'
                          : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                      }`}
                      onClick={() => onPageChange(page as number)}
                    >
                      {page}
                    </button>
                  )
                )
              })()}
            </div>

            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
