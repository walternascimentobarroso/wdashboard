import { User } from '@/types/user'

export interface LoginRequest {
  email: string
  password: string
  rememberMe?: boolean
}

export interface LoginResponse {
  user: User
  token: string
  expiresAt: Date
  permissions: string[]
}

export interface TokenVerification {
  valid: boolean
  user?: User
  expiresAt?: Date
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}
