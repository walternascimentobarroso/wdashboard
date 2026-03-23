# Quick Start Guide: Users CRUD Management

**Date**: March 23, 2026  
**Feature**: Users CRUD Management

## Overview

This guide provides step-by-step instructions for implementing and using the Users CRUD feature in the WDashboard application.

## Prerequisites

- Node.js 18+ installed
- Next.js 14+ project with TypeScript
- shadcn/ui components configured
- Tailwind CSS configured
- Existing dashboard layout structure

## Installation Steps

### 1. Create Feature Directory Structure

```bash
mkdir -p features/users/{types,services,hooks,components}
mkdir -p app/users
mkdir -p tests/features/users/{unit,integration,contract}
```

### 2. Install Dependencies (if not already present)

```bash
npm install @hookform/resolvers react-hook-form zod
npm install @tanstack/react-table
```

### 3. Create Type Definitions

Create `features/users/types/index.ts`:

```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export type UserRole = 'admin' | 'user';
export type UserStatus = 'active' | 'inactive';

export interface CreateUserRequest {
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}
```

### 4. Implement Storage Service

Create `features/users/services/storage.ts`:

```typescript
import { User, CreateUserRequest, UpdateUserRequest } from '../types';

export class UsersStorage {
  private readonly STORAGE_KEY = 'wdashboard-users';

  async getUsers(): Promise<User[]> {
    // Implementation details
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    // Implementation details
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    // Implementation details
  }

  async deleteUser(id: string): Promise<void> {
    // Implementation details
  }
}
```

### 5. Create React Hook

Create `features/users/hooks/useUsers.ts`:

```typescript
import { useState, useEffect } from 'react';
import { User, CreateUserRequest, UpdateUserRequest } from '../types';
import { UsersStorage } from '../services/storage';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Implementation details
}
```

### 6. Build Components

#### User Table Component
Create `features/users/components/user-table.tsx`:

```typescript
'use client';

import { User } from '../types';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  // Implementation using shadcn Table components
}
```

#### User Form Component
Create `features/users/components/user-form.tsx`:

```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, CreateUserRequest, UpdateUserRequest } from '../types';

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => void;
  onCancel: () => void;
}

export function UserForm({ user, onSubmit, onCancel }: UserFormProps) {
  // Implementation using react-hook-form and shadcn components
}
```

#### Delete Dialog Component
Create `features/users/components/delete-dialog.tsx`:

```typescript
'use client';

import { User } from '../types';

interface DeleteDialogProps {
  user: User;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteDialog({ user, onConfirm, onCancel }: DeleteDialogProps) {
  // Implementation using shadcn Dialog components
}
```

### 7. Create Users Page

Create `app/users/page.tsx`:

```typescript
'use client';

import { useUsers } from '../../features/users/hooks/useUsers';
import { UserTable } from '../../features/users/components/user-table';
import { UserForm } from '../../features/users/components/user-form';
import { DeleteDialog } from '../../features/users/components/delete-dialog';

export default function UsersPage() {
  const hook = useUsers();
  
  // Implementation combining all components
}
```

### 8. Update Navigation

Add users route to navigation configuration:

```typescript
// lib/navigation.ts
export const navigation = [
  // ... existing items
  {
    title: 'Users',
    href: '/users',
    icon: Users,
  },
];
```

## Usage Examples

### Creating a New User

```typescript
const { createUser } = useUsers();

await createUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  status: 'active'
});
```

### Updating an Existing User

```typescript
const { updateUser } = useUsers();

await updateUser('user-id', {
  name: 'John Smith',
  role: 'admin'
});
```

### Deleting a User

```typescript
const { deleteUser } = useUsers();

await deleteUser('user-id');
```

### Filtering and Sorting

```typescript
const { setFiltering, setSorting } = useUsers();

// Filter by role
setFiltering({ role: 'admin' });

// Sort by name
setSorting('name', 'asc');
```

## Testing

### Unit Tests

```bash
# Run unit tests for storage service
npm test features/users/services/storage.test.ts

# Run unit tests for components
npm test features/users/components/
```

### Integration Tests

```bash
# Run integration tests for user flows
npm test tests/features/users/integration/
```

### Manual Testing Checklist

- [ ] Create new user with valid data
- [ ] Create user with invalid email (should show validation error)
- [ ] Create user with duplicate email (should show error)
- [ ] Edit existing user
- [ ] Delete user (with confirmation)
- [ ] Try to delete last admin (should be prevented)
- [ ] Sort table by different columns
- [ ] Filter users by search term
- [ ] Filter users by role and status
- [ ] Navigate between pages
- [ ] Refresh page and verify data persistence

## Troubleshooting

### Common Issues

1. **localStorage Quota Exceeded**
   - Clear old data or implement data cleanup
   - Consider implementing data compression

2. **Data Not Persisting**
   - Check browser localStorage settings
   - Verify storage service implementation

3. **Performance Issues**
   - Implement pagination for large datasets
   - Add debouncing to search input

4. **Validation Errors**
   - Check Zod schema definitions
   - Verify form field mappings

### Debug Mode

Enable debug logging by setting environment variable:

```bash
NEXT_PUBLIC_DEBUG_USERS=true
```

## Migration to Real API

When ready to migrate from localStorage to a real API:

1. Replace `UsersStorage` implementation with API calls
2. Update error handling for network errors
3. Add loading states for async operations
4. Implement proper authentication/authorization

The service layer abstraction makes this migration seamless without changing component code.
