# Interface Contracts: Users CRUD Management

**Date**: March 23, 2026  
**Feature**: Users CRUD Management

## Overview

This directory defines the public interfaces and contracts for the Users CRUD feature. These contracts ensure consistent behavior, enable testing, and provide clear boundaries between components.

## Storage Service Contract

### IUsersStorage

Interface defining the storage abstraction layer for user data operations.

```typescript
interface IUsersStorage {
  // Read operations
  getUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  
  // Write operations
  createUser(user: CreateUserRequest): Promise<User>;
  updateUser(id: string, updates: UpdateUserRequest): Promise<User>;
  deleteUser(id: string): Promise<void>;
  
  // Utility operations
  isEmailAvailable(email: string, excludeId?: string): Promise<boolean>;
  canDeleteUser(id: string): Promise<boolean>;
}
```

## Data Transfer Objects

### CreateUserRequest

Request payload for creating a new user.

```typescript
interface CreateUserRequest {
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus; // Defaults to 'active'
}
```

### UpdateUserRequest

Request payload for updating an existing user.

```typescript
interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}
```

### UserTableState

State interface for the user table component.

```typescript
interface UserTableState {
  users: User[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
  sorting: {
    column: keyof User;
    direction: 'asc' | 'desc';
  };
  filtering: {
    search: string;
    role?: UserRole;
    status?: UserStatus;
  };
}
```

## Component Contracts

### UserTableProps

Props interface for the UserTable component.

```typescript
interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onSort: (column: keyof User) => void;
  onFilter: (filters: UserFilters) => void;
  onPageChange: (page: number) => void;
}
```

### UserFormProps

Props interface for the UserForm component.

```typescript
interface UserFormProps {
  user?: User; // undefined for create mode
  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => void;
  onCancel: () => void;
  loading: boolean;
  error?: string;
}
```

### DeleteDialogProps

Props interface for the DeleteDialog component.

```typescript
interface DeleteDialogProps {
  user: User;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}
```

## Hook Contracts

### UseUsersReturn

Return interface for the useUsers hook.

```typescript
interface UseUsersReturn {
  // Data
  users: User[];
  loading: boolean;
  error: string | null;
  
  // Table state
  state: UserTableState;
  
  // Actions
  createUser: (data: CreateUserRequest) => Promise<void>;
  updateUser: (id: string, data: UpdateUserRequest) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  refreshUsers: () => Promise<void>;
  
  // Table actions
  setSorting: (column: keyof User, direction: 'asc' | 'desc') => void;
  setFiltering: (filters: Partial<UserFilters>) => void;
  setPagination: (page: number, pageSize?: number) => void;
}
```

## Event Contracts

### UserEvents

Events that can be emitted by user management operations.

```typescript
type UserEvent = 
  | { type: 'USER_CREATED'; payload: User }
  | { type: 'USER_UPDATED'; payload: User }
  | { type: 'USER_DELETED'; payload: { id: string } }
  | { type: 'USER_LOADED'; payload: User[] }
  | { type: 'USER_ERROR'; payload: { error: string; operation: string } };
```

## Validation Contracts

### ValidationErrors

Standardized error format for validation failures.

```typescript
interface ValidationError {
  field: string;
  code: string;
  message: string;
  value?: any;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
```

## Error Handling Contracts

### UserErrorCodes

Standardized error codes for user operations.

```typescript
type UserErrorCode =
  | 'VALIDATION_ERROR'
  | 'DUPLICATE_EMAIL'
  | 'USER_NOT_FOUND'
  | 'LAST_ADMIN_DELETION'
  | 'LAST_ADMIN_DEMOTION'
  | 'STORAGE_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';
```

### UserError

Standardized error format.

```typescript
interface UserError {
  code: UserErrorCode;
  message: string;
  details?: any;
  operation: 'create' | 'update' | 'delete' | 'read';
}
```

## Testing Contracts

### MockUsersStorage

Mock implementation of IUsersStorage for testing.

```typescript
class MockUsersStorage implements IUsersStorage {
  // Implementation details in test files
  // Provides deterministic behavior for unit tests
}
```

### TestFixtures

Standard test data for consistent testing.

```typescript
interface TestUserFixtures {
  adminUser: User;
  regularUser: User;
  inactiveUser: User;
  userCollection: User[];
}
```
