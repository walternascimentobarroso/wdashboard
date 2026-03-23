import { useState, useEffect, useCallback } from 'react';
import { User, CreateUserRequest, UpdateUserRequest, UserTableState, UserFilters, UserError } from '../types';
import { UsersStorage } from '../services/storage';

const USERS_PER_PAGE = 10;

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<UserTableState>({
    users: [],
    loading: false,
    error: null,
    pagination: {
      page: 1,
      pageSize: USERS_PER_PAGE,
      total: 0,
    },
    sorting: {
      column: 'createdAt',
      direction: 'desc',
    },
    filtering: {
      search: '',
      role: undefined,
      status: undefined,
    },
  });

  const storage = new UsersStorage();

  // Load users from storage
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const loadedUsers = await storage.getUsers();
      setUsers(loadedUsers);
      setState(prev => ({ ...prev, users: loadedUsers, loading: false }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load users';
      setError(errorMessage);
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
    } finally {
      setLoading(false);
    }
  }, [storage]);

  // Initialize users on mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Filter users based on current filters
  const getFilteredUsers = useCallback(() => {
    let filtered = [...users];

    // Apply search filter
    if (state.filtering.search) {
      const searchLower = state.filtering.search.toLowerCase();
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    // Apply role filter
    if (state.filtering.role) {
      filtered = filtered.filter(user => user.role === state.filtering.role);
    }

    // Apply status filter
    if (state.filtering.status) {
      filtered = filtered.filter(user => user.status === state.filtering.status);
    }

    return filtered;
  }, [users, state.filtering]);

  // Sort users based on current sorting
  const getSortedUsers = useCallback((filteredUsers: User[]) => {
    const sorted = [...filteredUsers];
    const { column, direction } = state.sorting;

    sorted.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return direction === 'asc' ? comparison : -comparison;
      }

      // Handle date comparison
      if (column === 'createdAt') {
        const aDate = new Date(aValue as string);
        const bDate = new Date(bValue as string);
        const comparison = aDate.getTime() - bDate.getTime();
        return direction === 'asc' ? comparison : -comparison;
      }

      // Default comparison
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [state.sorting]);

  // Get paginated users
  const getPaginatedUsers = useCallback(() => {
    const filtered = getFilteredUsers();
    const sorted = getSortedUsers(filtered);
    
    const startIndex = (state.pagination.page - 1) * state.pagination.pageSize;
    const endIndex = startIndex + state.pagination.pageSize;
    
    return sorted.slice(startIndex, endIndex);
  }, [getFilteredUsers, getSortedUsers, state.pagination]);

  // Update pagination total
  const updatePaginationTotal = useCallback(() => {
    const filtered = getFilteredUsers();
    setState(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        total: filtered.length,
      },
    }));
  }, [getFilteredUsers]);

  // Update pagination when filters change
  useEffect(() => {
    updatePaginationTotal();
  }, [updatePaginationTotal]);

  // Create user
  const createUser = useCallback(async (userData: CreateUserRequest) => {
    setLoading(true);
    setError(null);

    try {
      const newUser = await storage.createUser(userData);
      await loadUsers(); // Reload all users
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storage, loadUsers]);

  // Update user
  const updateUser = useCallback(async (id: string, updates: UpdateUserRequest) => {
    setLoading(true);
    setError(null);

    try {
      const updatedUser = await storage.updateUser(id, updates);
      await loadUsers(); // Reload all users
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storage, loadUsers]);

  // Delete user
  const deleteUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await storage.deleteUser(id);
      await loadUsers(); // Reload all users
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storage, loadUsers]);

  // Refresh users
  const refreshUsers = useCallback(async () => {
    await loadUsers();
  }, [loadUsers]);

  // Set sorting
  const setSorting = useCallback((column: keyof User, direction: 'asc' | 'desc') => {
    setState(prev => ({
      ...prev,
      sorting: { column, direction },
      pagination: { ...prev.pagination, page: 1 }, // Reset to first page
    }));
  }, []);

  // Set filtering
  const setFiltering = useCallback((filters: Partial<UserFilters>) => {
    setState(prev => ({
      ...prev,
      filtering: { ...prev.filtering, ...filters },
      pagination: { ...prev.pagination, page: 1 }, // Reset to first page
    }));
  }, []);

  // Set pagination
  const setPagination = useCallback((page: number, pageSize?: number) => {
    setState(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        page,
        ...(pageSize && { pageSize }),
      },
    }));
  }, []);

  // Get current display users
  const displayUsers = getPaginatedUsers();

  return {
    // Data
    users,
    displayUsers,
    loading,
    error,
    
    // State
    state,
    
    // Actions
    createUser,
    updateUser,
    deleteUser,
    refreshUsers,
    
    // Table actions
    setSorting,
    setFiltering,
    setPagination,
    
    // Computed values
    filteredUsers: getFilteredUsers(),
    hasUsers: users.length > 0,
    hasFilteredUsers: getFilteredUsers().length > 0,
    totalPages: Math.ceil(getFilteredUsers().length / state.pagination.pageSize),
    currentPage: state.pagination.page,
  };
}
