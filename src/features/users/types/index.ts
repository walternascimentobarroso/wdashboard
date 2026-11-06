export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
}

export type UserRole = 'admin' | 'user'
export type UserStatus = 'active' | 'inactive'

export interface CreateUserRequest {
  name: string
  email: string
  role: UserRole
  status?: UserStatus // Defaults to 'active'
}

export interface UpdateUserRequest {
  name?: string
  email?: string
  role?: UserRole
  status?: UserStatus
}

export interface UserFilters {
  search: string
  role?: UserRole
  status?: UserStatus
}

export interface UserTableState {
  users: User[]
  loading: boolean
  error: string | null
  pagination: {
    page: number
    pageSize: number
    total: number
  }
  sorting: {
    column: keyof User
    direction: 'asc' | 'desc'
  }
  filtering: UserFilters
}

export type UserErrorCode =
  | 'VALIDATION_ERROR'
  | 'DUPLICATE_EMAIL'
  | 'USER_NOT_FOUND'
  | 'LAST_ADMIN_DELETION'
  | 'LAST_ADMIN_DEMOTION'
  | 'STORAGE_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR'

export interface UserError {
  code: UserErrorCode
  message: string
  details?: unknown
  operation: 'create' | 'update' | 'delete' | 'read'
}
