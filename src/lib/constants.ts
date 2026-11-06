// App metadata
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'WDashboard'
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'

// API configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Mock delays (in milliseconds)
export const MOCK_DELAYS = {
  AUTH: 500,
  DATA_FETCH: 200,
  FILE_UPLOAD: 1000,
  CRUD: 300,
  ERROR_RATE: 0.05, // 5% error rate
}

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMIT_OPTIONS: [10, 25, 50],
}

// File upload limits
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain',
    'application/json',
    'text/csv',
  ],
}

// Navigation structure
export const NAVIGATION = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    id: 'users',
    label: 'Users',
    href: '/users',
    icon: 'Users',
  },
  {
    id: 'files',
    label: 'Files',
    href: '/files',
    icon: 'FileText',
  },
  {
    id: 'logs',
    label: 'Logs',
    href: '/logs',
    icon: 'FileSearch',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: 'Settings',
  },
]

// Log levels
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
} as const

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  VIEWER: 'viewer',
} as const

// User statuses
export const USER_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
} as const

// File statuses
export const FILE_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  DONE: 'done',
  ERROR: 'error',
} as const

// Error codes
export const ERROR_CODES = {
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
} as const

// Toast configurations
export const TOAST_CONFIG = {
  DURATION: 5000, // 5 seconds
  POSITION: 'top-right' as const,
  MAX_TOASTS: 3,
}

// Chart colors
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#06b6d4',
}
