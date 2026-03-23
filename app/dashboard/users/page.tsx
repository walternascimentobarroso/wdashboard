'use client';

import { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useUsers } from '@/features/users/hooks/useUsers';
import { UserTable } from '@/features/users/components/user-table';
import { UserForm } from '@/features/users/components/user-form';
import { DeleteDialog } from '@/features/users/components/delete-dialog';
import { EmptyState } from '@/features/users/components/empty-state';
import { LoadingState } from '@/features/users/components/loading-state';
import { userToasts } from '@/features/users/components/toast-notifications';
import { User } from '@/features/users/types';
import { UserRole, UserStatus } from '@/features/users/types';
import { useTranslations } from 'next-intl';

export default function UsersPage() {
  const t = useTranslations();
  
  const {
    displayUsers,
    loading,
    error,
    state,
    createUser,
    updateUser,
    deleteUser,
    setSorting,
    setFiltering,
    setPagination,
    hasUsers,
    hasFilteredUsers,
    totalPages,
    currentPage,
    getFilteredUsers,
  } = useUsers();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['name', 'email', 'role', 'status', 'createdAt', 'actions']);

  const handleColumnVisibilityChange = (columns: string[]) => {
    setVisibleColumns(columns);
  };

  const allColumns = [
    { key: 'name', label: t('users.columns.name') },
    { key: 'email', label: t('users.columns.email') },
    { key: 'role', label: t('users.columns.role') },
    { key: 'status', label: t('users.columns.status') },
    { key: 'createdAt', label: t('users.columns.created') },
    { key: 'actions', label: t('users.columns.actions') },
  ];

  const toggleColumn = (columnKey: string) => {
    const newColumns = visibleColumns.includes(columnKey)
      ? visibleColumns.filter(col => col !== columnKey)
      : [...visibleColumns, columnKey];
    setVisibleColumns(newColumns);
  };

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCreateUser = async (userData: any) => {
    try {
      await createUser(userData);
      setIsCreateModalOpen(false);
      userToasts.userCreated(userData.name);
    } catch (error: any) {
      if (error.code === 'DUPLICATE_EMAIL') {
        userToasts.duplicateEmailError();
      } else if (error.code === 'VALIDATION_ERROR') {
        userToasts.validationError('input');
      } else {
        userToasts.createError(error.message || 'Unknown error');
      }
    }
  };

  const handleEditUser = async (userData: any) => {
    if (!selectedUser) return;
    
    try {
      await updateUser(selectedUser.id, userData);
      setIsEditModalOpen(false);
      setSelectedUser(null);
      userToasts.userUpdated(userData.name || selectedUser.name);
    } catch (error: any) {
      if (error.code === 'DUPLICATE_EMAIL') {
        userToasts.duplicateEmailError();
      } else if (error.code === 'VALIDATION_ERROR') {
        userToasts.validationError('input');
      } else if (error.code === 'LAST_ADMIN_DEMOTION') {
        userToasts.lastAdminError();
      } else {
        userToasts.updateError(error.message || 'Unknown error');
      }
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      await deleteUser(selectedUser.id);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      userToasts.userDeleted(selectedUser.name);
    } catch (error: any) {
      if (error.code === 'LAST_ADMIN_DELETION') {
        userToasts.lastAdminError();
      } else {
        userToasts.deleteError(error.message || 'Unknown error');
      }
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSort = (column: keyof User, direction: 'asc' | 'desc') => {
    setSorting(column, direction);
  };

  const handlePageChange = (page: number) => {
    setPagination(page);
  };

  const handleSearchChange = (value: string) => {
    setFiltering({ search: value });
  };

  const handleRoleFilterChange = (value: string) => {
    setFiltering({ role: value === 'all' ? undefined : value as UserRole });
  };

  const handleStatusFilterChange = (value: string) => {
    setFiltering({ status: value === 'all' ? undefined : value as UserStatus });
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination(1, pageSize); // Reset to first page when changing page size
  };

  if (loading && !hasUsers) {
    return <LoadingState />;
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
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
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
            value={state.filtering.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="min-w-[160px] w-[200px]"
          />
          <Select value={state.filtering.role || 'all'} onValueChange={handleRoleFilterChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t('users.roles.admin')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('users.allRoles')}</SelectItem>
              <SelectItem value="admin">{t('users.roles.admin')}</SelectItem>
              <SelectItem value="user">{t('users.roles.user')}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={state.filtering.status || 'all'} onValueChange={handleStatusFilterChange}>
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
          {/* Column Visibility Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                {t('users.customizeColumns')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <div className="p-2">
                <p className="text-sm font-medium mb-2">{t('users.toggleColumns')}</p>
                {allColumns.map((column) => (
                  <DropdownMenuItem
                    key={column.key}
                    className="flex items-center space-x-2 p-2 cursor-pointer"
                    onClick={() => toggleColumn(column.key)}
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(column.key)}
                      onChange={() => {}}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm">{column.label}</span>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={() => setIsCreateModalOpen(true)} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            {t('users.addUser')}
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md">
          {error}
        </div>
      )}

      {/* Users Table */}
      {hasFilteredUsers ? (
        <UserTable
          users={displayUsers}
          loading={loading}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSize={state.pagination.pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={getFilteredUsers().length}
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
  );
}
