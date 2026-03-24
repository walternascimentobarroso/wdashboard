// Re-export all types from individual modules
export * from './user'
export * from './file'
export * from './log'
export * from './kpi'
export * from './feature-flag'
export * from './profile'

// Common API response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  timestamp: Date
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: unknown
  }
  timestamp: Date
}

// Common UI types
export type SortOrder = 'asc' | 'desc'
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

// Navigation types
export interface NavItem {
  id: string
  label: string
  href: string
  icon?: string
  badge?: string
  requiredRole?: string
}

// Form types
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'select' | 'checkbox' | 'textarea'
  required?: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
  }
}
