'use client'

import { Plus, UserCheck, UserPlus, Users, UserX } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { KPICard } from '@/components/dashboard/kpi-card'
import { ColumnToggle } from '@/components/shared/data-table/column-toggle'
import { DataTable } from '@/components/shared/data-table/data-table'
import { ExportButton } from '@/components/shared/data-table/export-button'
import { LoadingState } from '@/components/shared/data-table/loading-state'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

const NEW_USER_WINDOW_MS = 30 * 24 * 60 * 60 * 1000

function countUsers(users: User[]) {
  const since = Date.now() - NEW_USER_WINDOW_MS
  const active = users.filter((user) => user.status === 'active').length
  return {
    total: users.length,
    active,
    inactive: users.length - active,
    recent: users.filter((user) => new Date(user.createdAt).getTime() >= since).length,
  }
}

export default function UsersPage() {
  const t = useTranslations()

  const columns = useUserColumns()
  const {
    items: users,
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

  const stats = useMemo(() => countUsers(users), [users])

  const openCreate = () => setIsCreateModalOpen(true)

  const header = (
    <PageHeader
      title={t('users.title')}
      description={t('users.description')}
      breadcrumb={[
        { label: t('navigation.dashboard'), href: '/dashboard' },
        { label: t('users.title') },
      ]}
      actions={
        <Button onClick={openCreate}>
          <Plus />
          {t('users.create')}
        </Button>
      }
    />
  )

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
    setPagination(1, pageSize)
  }

  if (loading && !hasUsers) {
    return <LoadingState />
  }

  if (!hasUsers) {
    return (
      <div className="space-y-6">
        {header}
        <EmptyState onCreateUser={openCreate} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {header}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard
          title={t('users.kpi.total')}
          value={stats.total}
          icon={<Users />}
          description={t('users.kpi.totalDesc')}
        />
        <KPICard
          title={t('users.kpi.active')}
          value={stats.active}
          icon={<UserCheck />}
          description={t('users.kpi.activeDesc')}
        />
        <KPICard
          title={t('users.kpi.inactive')}
          value={stats.inactive}
          icon={<UserX />}
          description={t('users.kpi.inactiveDesc')}
        />
        <KPICard
          title={t('users.kpi.new')}
          value={stats.recent}
          icon={<UserPlus />}
          description={t('users.kpi.newDesc')}
        />
      </div>

      <Card className="p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end">
          <div className="space-y-2">
            <Label htmlFor="users-search">{t('users.filters.search')}</Label>
            <Input
              id="users-search"
              placeholder={t('users.searchPlaceholder')}
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="users-role">{t('users.columns.role')}</Label>
            <Select value={filters.role || 'all'} onValueChange={handleRoleFilterChange}>
              <SelectTrigger id="users-role" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('users.allRoles')}</SelectItem>
                <SelectItem value="admin">{t('users.roles.admin')}</SelectItem>
                <SelectItem value="user">{t('users.roles.user')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="users-status">{t('users.columns.status')}</Label>
            <Select value={filters.status || 'all'} onValueChange={handleStatusFilterChange}>
              <SelectTrigger id="users-status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('users.allStatuses')}</SelectItem>
                <SelectItem value="active">{t('users.statuses.active')}</SelectItem>
                <SelectItem value="inactive">{t('users.statuses.inactive')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
          </div>
        </div>
      </Card>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-destructive">
          {error}
        </div>
      )}

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
        <EmptyState onCreateUser={openCreate} filtered />
      )}

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

      <UserForm
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleEditUser}
        loading={loading}
        title={t('users.form.editTitle')}
        description={t('users.form.editDesc')}
        user={selectedUser}
      />

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
