'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useUsers } from '@/features/users/hooks/useUsers';
import { UserTable } from '@/features/users/components/user-table';
import { UserForm } from '@/features/users/components/user-form';
import { DeleteDialog } from '@/features/users/components/delete-dialog';
import { EmptyState } from '@/features/users/components/empty-state';
import { LoadingState } from '@/features/users/components/loading-state';
import { userToasts } from '@/features/users/components/toast-notifications';
import { User } from '@/features/users/types';
import { UserRole, UserStatus } from '@/features/users/types';

export default function UsersPage() {
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
  } = useUsers();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  if (loading && !hasUsers) {
    return <LoadingState />;
  }

  if (!hasUsers) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Users</h1>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
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
        <h1 className="text-3xl font-bold">Users</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search users..."
          value={state.filtering.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="max-w-sm"
        />
        <Select value={state.filtering.role || 'all'} onValueChange={handleRoleFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <Select value={state.filtering.status || 'all'} onValueChange={handleStatusFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
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
          pageSize={state.pagination.pageSize}
          currentPage={currentPage}
          totalPages={totalPages}
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
        title="Create New User"
        description="Add a new user to the system. Fill in the details below."
      />

      {/* Edit User Modal */}
      <UserForm
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        onSubmit={handleEditUser}
        loading={loading}
        title="Edit User"
        description="Update the user information below."
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
