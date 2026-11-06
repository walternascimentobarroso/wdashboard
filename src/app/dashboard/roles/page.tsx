'use client'

import { Plus, Shield } from 'lucide-react'
import { useFormatter, useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'
import { ColumnToggle } from '@/components/shared/data-table/column-toggle'
import { ConfirmDeleteDialog } from '@/components/shared/data-table/confirm-delete-dialog'
import { DataTable } from '@/components/shared/data-table/data-table'
import { ExportButton } from '@/components/shared/data-table/export-button'
import { LoadingState } from '@/components/shared/data-table/loading-state'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useRoleColumns } from '@/features/roles/components/role-columns'
import { RoleForm } from '@/features/roles/components/role-form'
import { RoleViewDialog } from '@/features/roles/components/role-view-dialog'
import { useRoles } from '@/features/roles/hooks/useRoles'
import type { CreateRoleRequest, Role, RoleStatus } from '@/features/roles/types'
import type { CrudError } from '@/lib/local-crud'

type DialogKind = 'create' | 'view' | 'edit' | 'delete'

export default function RolesPage() {
  const t = useTranslations('roles')
  const format = useFormatter()
  const columns = useRoleColumns()
  const roles = useRoles()

  const [dialog, setDialog] = useState<DialogKind | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    ...columns.map((column) => column.key),
    'actions',
  ])

  const open = (kind: DialogKind, role: Role | null = null) => {
    setSelectedRole(role)
    setDialog(kind)
  }

  const close = () => setDialog(null)

  const dialogProps = (kind: DialogKind) => ({
    open: dialog === kind,
    onOpenChange: (isOpen: boolean) => setDialog(isOpen ? kind : null),
  })

  const run = async (action: () => Promise<unknown>, successKey: string, name: string) => {
    try {
      await action()
      close()
      toast.success(t(`toasts.${successKey}`, { name }))
    } catch (error) {
      const { code, message } = error as CrudError
      toast.error(
        code === 'DUPLICATE_NAME'
          ? t('toasts.duplicateName')
          : t('toasts.error', { error: message })
      )
    }
  }

  const handleCreate = (data: CreateRoleRequest) =>
    run(() => roles.create(data), 'created', data.name)

  const handleEdit = (data: CreateRoleRequest) => {
    if (!selectedRole) return
    run(() => roles.update(selectedRole.id, data), 'updated', data.name)
  }

  const handleDelete = () => {
    if (!selectedRole) return
    run(() => roles.remove(selectedRole.id), 'deleted', selectedRole.name)
  }

  const exportRows = roles.filteredItems.map((role) => ({
    name: role.name,
    description: role.description,
    status: t(`statuses.${role.status}`),
    createdAt: format.dateTime(new Date(role.createdAt), { dateStyle: 'short' }),
  }))

  const createForm = (
    <RoleForm
      {...dialogProps('create')}
      onSubmit={handleCreate}
      loading={roles.loading}
      title={t('form.createTitle')}
      description={t('form.createDesc')}
    />
  )

  if (roles.loading && !roles.hasItems) {
    return <LoadingState />
  }

  if (!roles.hasItems) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
        <EmptyState
          icon={<Shield className="h-8 w-8 text-muted-foreground" />}
          title={t('empty.title')}
          description={t('empty.description')}
          action={{ label: t('addRole'), onClick: () => open('create') }}
        />
        {createForm}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Breadcrumb items={[{ label: t('title') }]} />

      <h1 className="text-3xl font-bold">{t('title')}</h1>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Input
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            value={roles.filters.search}
            onChange={(e) => roles.setFiltering({ search: e.target.value })}
            className="min-w-[160px] w-[200px]"
          />
          <Select
            value={roles.filters.status || 'all'}
            onValueChange={(value) =>
              roles.setFiltering({ status: value === 'all' ? undefined : (value as RoleStatus) })
            }
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allStatuses')}</SelectItem>
              <SelectItem value="active">{t('statuses.active')}</SelectItem>
              <SelectItem value="inactive">{t('statuses.inactive')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <ExportButton
            table={{
              title: t('title'),
              filename: 'roles',
              columns: columns.map(({ key, label }) => ({ key, header: label })),
              rows: exportRows,
            }}
            disabled={roles.loading}
          />
          <ColumnToggle
            columns={columns}
            visibleColumns={visibleColumns}
            onChange={setVisibleColumns}
          />
          <Button onClick={() => open('create')} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {t('addRole')}
          </Button>
        </div>
      </div>

      {roles.error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md">{roles.error}</div>
      )}

      {roles.hasFilteredItems ? (
        <DataTable
          columns={columns}
          data={roles.displayItems}
          loading={roles.loading}
          visibleColumns={visibleColumns}
          sorting={roles.sorting}
          onSort={roles.setSorting}
          onView={(role) => open('view', role)}
          onEdit={(role) => open('edit', role)}
          onDelete={(role) => open('delete', role)}
          onPageChange={(page) => roles.setPagination(page)}
          onPageSizeChange={(pageSize) => roles.setPagination(1, pageSize)}
          pageSize={roles.pageSize}
          currentPage={roles.currentPage}
          totalPages={roles.totalPages}
          totalItems={roles.filteredItems.length}
        />
      ) : (
        <EmptyState
          icon={<Shield className="h-8 w-8 text-muted-foreground" />}
          title={t('empty.filteredTitle')}
          description={t('empty.filteredDescription')}
        />
      )}

      {createForm}

      <RoleViewDialog {...dialogProps('view')} role={selectedRole} />

      <RoleForm
        {...dialogProps('edit')}
        onSubmit={handleEdit}
        loading={roles.loading}
        title={t('form.editTitle')}
        description={t('form.editDesc')}
        role={selectedRole}
      />

      <ConfirmDeleteDialog
        {...dialogProps('delete')}
        onConfirm={handleDelete}
        loading={roles.loading}
        title={t('deleteTitle')}
        itemName={selectedRole?.name}
      />
    </div>
  )
}
