'use client'

import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { ColumnToggle } from '@/components/shared/data-table/column-toggle'
import { DataTable } from '@/components/shared/data-table/data-table'
import { ExportButton } from '@/components/shared/data-table/export-button'
import { LoadingState } from '@/components/shared/data-table/loading-state'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DeleteDialog } from '@/features/users/components/delete-dialog'
import { EmptyState } from '@/features/users/components/empty-state'
import { userToasts } from '@/features/users/components/toast-notifications'
import { useUserColumns } from '@/features/users/components/user-columns'
import { UserForm } from '@/features/users/components/user-form'
import { UserViewDialog } from '@/features/users/components/user-view-dialog'
import { useUsers } from '@/features/users/hooks/useUsers'
import type {
  CreateUserRequest,
  UpdateUserRequest,
  User,
  UserRole,
  UserStatus,
} from '@/features/users/types'
import { transformUserForExport } from '@/lib/export-utils'

export default function UsersPage() {
  const t = useTranslations()

  const columns = useUserColumns()
  const {
    displayItems: displayUsers,
    filteredItems: filteredUsers,
    loading,
    error,
    filters,
    sorting,
    pageSize,
    create: createUser,
    update: updateUser,
    remove: deleteUser,
    setSorting,
    setFiltering,
    setPagination,
    hasItems: hasUsers,
    hasFilteredItems: hasFilteredUsers,
    totalPages,
    currentPage,
  } = useUsers()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'name',
    'email',
    'role',
    'status',
    'createdAt',
    'actions',
  ])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleCreateUser = async (userData: CreateUserRequest | UpdateUserRequest) => {
    try {
      await createUser(userData as CreateUserRequest)
      setIsCreateModalOpen(false)
      userToasts.userCreated(userData.name || 'Unknown user')
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        const err = error as { code: string; message?: string }
        if (err.code === 'DUPLICATE_EMAIL') {
          userToasts.duplicateEmailError()
        } else if (err.code === 'VALIDATION_ERROR') {
          userToasts.validationError('input')
        } else {
          userToasts.createError(err.message || 'Unknown error')
        }
      } else {
        userToasts.createError('Unknown error')
      }
    }
  }

  const handleEditUser = async (userData: UpdateUserRequest) => {
    if (!selectedUser) return

    try {
      await updateUser(selectedUser.id, userData)
      setIsEditModalOpen(false)
      setSelectedUser(null)
      userToasts.userUpdated(userData.name || selectedUser.name)
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        const err = error as { code: string; message?: string }
        if (err.code === 'DUPLICATE_EMAIL') {
          userToasts.duplicateEmailError()
        } else if (err.code === 'VALIDATION_ERROR') {
          userToasts.validationError('input')
        } else if (err.code === 'LAST_ADMIN_DEMOTION' || err.code === 'LAST_ADMIN_DEACTIVATION') {
          userToasts.lastAdminError()
        } else {
          userToasts.updateError(err.message || 'Unknown error')
        }
      } else {
        userToasts.updateError('Unknown error')
      }
    }
  }

  const handleDeleteUser = async () => {
    if (!selectedUser) return

    try {
      await deleteUser(selectedUser.id)
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
      userToasts.userDeleted(selectedUser.name)
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        const err = error as { code: string; message?: string }
        if (err.code === 'LAST_ADMIN_DELETION') {
          userToasts.lastAdminError()
        } else {
          userToasts.deleteError(err.message || 'Unknown error')
        }
      } else {
        userToasts.deleteError('Unknown error')
      }
    }
  }

  const handleViewClick = (user: User) => {
    setSelectedUser(user)
    setIsViewModalOpen(true)
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user)
    setIsDeleteModalOpen(true)
  }

  const handleSort = (column: keyof User, direction: 'asc' | 'desc') => {
    setSorting(column, direction)
  }

  const handlePageChange = (page: number) => {
    setPagination(page)
  }

  const handleSearchChange = (value: string) => {
    setFiltering({ search: value })
  }

  const handleRoleFilterChange = (value: string) => {
    setFiltering({ role: value === 'all' ? undefined : (value as UserRole) })
  }

  const handleStatusFilterChange = (value: string) => {
    setFiltering({ status: value === 'all' ? undefined : (value as UserStatus) })
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPagination(1, pageSize) // Reset to first page when changing page size
  }

  if (loading && !hasUsers) {
    return <LoadingState />
  }

  if (!hasUsers) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{t('users.title')}</h1>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('users.addUser')}
          </Button>
        </div>
        <EmptyState onCreateUser={() => setIsCreateModalOpen(true)} />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: t('users.title') }]} />

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('users.title')}</h1>
      </div>

      {/* Controls - Filters on left, buttons on right */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Input
            placeholder={t('users.searchPlaceholder')}
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="min-w-[160px] w-[200px]"
          />
          <Select value={filters.role || 'all'} onValueChange={handleRoleFilterChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('users.roles.admin')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('users.allRoles')}</SelectItem>
              <SelectItem value="admin">{t('users.roles.admin')}</SelectItem>
              <SelectItem value="user">{t('users.roles.user')}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.status || 'all'} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('users.statuses.active')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('users.allStatuses')}</SelectItem>
              <SelectItem value="active">{t('users.statuses.active')}</SelectItem>
              <SelectItem value="inactive">{t('users.statuses.inactive')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <ExportButton
            table={{
              title: t('users.title'),
              filename: 'users',
              columns: columns.map(({ key, label }) => ({ key, header: label })),
              rows: transformUserForExport(filteredUsers),
            }}
            disabled={loading}
          />

          <ColumnToggle
            columns={columns}
            visibleColumns={visibleColumns}
            onChange={setVisibleColumns}
          />

          <Button onClick={() => setIsCreateModalOpen(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {t('users.addUser')}
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && <div className="bg-destructive/15 text-destructive p-3 rounded-md">{error}</div>}

      {/* Users Table */}
      {hasFilteredUsers ? (
        <DataTable
          columns={columns}
          data={displayUsers}
          sorting={sorting}
          loading={loading}
          onView={handleViewClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredUsers.length}
          visibleColumns={visibleColumns}
        />
      ) : (
        <EmptyState onCreateUser={() => setIsCreateModalOpen(true)} filtered={true} />
      )}

      {/* Create User Modal */}
      <UserForm
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreateUser}
        loading={loading}
        title={t('users.form.createTitle')}
        description={t('users.form.createDesc')}
      />

      <UserViewDialog
        open={isViewModalOpen}
        onOpenChange={setIsViewModalOpen}
        user={selectedUser}
      />

      {/* Edit User Modal */}
      <UserForm
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleEditUser}
        loading={loading}
        title={t('users.form.editTitle')}
        description={t('users.form.editDesc')}
        user={selectedUser}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDeleteUser}
        loading={loading}
        user={selectedUser}
      />
    </div>
  )
}
