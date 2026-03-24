# Data Model: Users CRUD Management

**Date**: March 23, 2026  
**Feature**: Users CRUD Management

## Core Entities

### User

Represents a system user with access permissions and account information.

```typescript
interface User {
  id: string // Unique identifier (UUID)
  name: string // Full name, required, max 100 characters
  email: string // Email address, required, unique, valid format
  role: UserRole // User permission level
  status: UserStatus // Account state
  createdAt: string // ISO 8601 timestamp
}
```

### UserRole

Defines permission levels for users.

```typescript
type UserRole = 'admin' | 'user'

// Role Definitions:
// - admin: Full system access, can manage other users
// - user: Limited access, can manage own profile only
```

### UserStatus

Represents account state.

```typescript
type UserStatus = 'active' | 'inactive'

// Status Definitions:
// - active: Can access system, full functionality
// - inactive: Access disabled, account suspended
```

## Validation Rules

### User Creation

- **name**: Required, 1-100 characters, letters, spaces, hyphens, apostrophes only
- **email**: Required, valid email format, unique across all users
- **role**: Required, must be 'admin' or 'user'
- **status**: Required, must be 'active' or 'inactive', defaults to 'active'

### User Updates

- **name**: Same validation as creation
- **email**: Same validation as creation, cannot be changed to existing email
- **role**: Can be changed, but last admin cannot be demoted
- **status**: Can be changed, but last admin cannot be deactivated

### User Deletion

- **Constraint**: Cannot delete the last administrator user
- **Constraint**: User with existing dependencies cannot be deleted (future enhancement)

## State Transitions

### Role Transitions

```
admin → user  (allowed, if other admins exist)
user  → admin (always allowed)
```

### Status Transitions

```
active   → inactive (allowed, if not last admin)
inactive → active   (always allowed)
```

## Data Relationships

### User-User Relationships

- **Self-reference**: No direct relationships between users
- **Admin constraint**: At least one user must have admin role
- **Email uniqueness**: No two users can share the same email

## Storage Schema

### localStorage Structure

```typescript
interface UsersStorage {
  users: User[]
  lastModified: string // ISO 8601 timestamp
  version: string // Schema version for migration
}
```

### Storage Key

- **Key**: `wdashboard-users`
- **Format**: JSON string of UsersStorage interface

## Error Conditions

### Validation Errors

- `INVALID_EMAIL`: Email format is invalid
- `DUPLICATE_EMAIL`: Email already exists
- `INVALID_NAME`: Name contains invalid characters or exceeds length
- `REQUIRED_FIELD`: Required field is missing or empty

### Business Rule Errors

- `LAST_ADMIN_DELETION`: Attempting to delete the last administrator
- `LAST_ADMIN_DEMOTION`: Attempting to demote the last administrator
- `LAST_ADMIN_DEACTIVATION`: Attempting to deactivate the last administrator

### Storage Errors

- `STORAGE_FULL`: localStorage quota exceeded
- `STORAGE_DISABLED`: localStorage is not available
- `STORAGE_CORRUPTED`: Data in localStorage is invalid or corrupted

## Performance Considerations

### Indexing Strategy

- **Email lookup**: Linear search acceptable for <1000 users
- **Role filtering**: Linear filter operation
- **Status filtering**: Linear filter operation

### Pagination

- **Page size**: 10 users per page
- **Total pages**: Calculated dynamically based on user count
- **Sorting**: Client-side sorting for current page only

## Migration Strategy

### Schema Versioning

- **Current version**: `1.0.0`
- **Migration**: Automatic migration on schema changes
- **Backward compatibility**: Maintained for one version prior

### Data Migration Rules

- **Add fields**: Default values applied automatically
- **Remove fields**: Data lost, documented in release notes
- **Change field types**: Validation and conversion applied
