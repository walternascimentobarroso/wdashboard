import { BaseMockService, MockDataStore } from '@/services/api'
import { User } from '@/types/user'
import { LoginRequest, LoginResponse, TokenVerification } from '../types'
import { MOCK_DELAYS, USER_ROLES } from '@/lib/constants'

export class MockAuthService extends BaseMockService {
  private store = MockDataStore.getInstance()
  private readonly TOKEN_KEY = 'auth_token'
  private readonly USER_KEY = 'current_user'

  constructor() {
    super()
    this.initializeMockUsers()
  }

  private initializeMockUsers(): void {
    if (!this.store.has('users')) {
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@dashboard.com',
          role: USER_ROLES.ADMIN,
          status: 'active',
          createdAt: new Date('2024-01-15'),
          lastLoginAt: new Date(),
          avatar: null,
        },
        {
          id: '2',
          name: 'Regular User',
          email: 'user@dashboard.com',
          role: USER_ROLES.USER,
          status: 'active',
          createdAt: new Date('2024-02-20'),
          lastLoginAt: new Date(),
          avatar: null,
        },
        {
          id: '3',
          name: 'Viewer User',
          email: 'viewer@dashboard.com',
          role: USER_ROLES.VIEWER,
          status: 'active',
          createdAt: new Date('2024-03-10'),
          lastLoginAt: new Date(),
          avatar: null,
        },
      ]
      this.store.set('users', mockUsers)
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    await this.delay(MOCK_DELAYS.AUTH)
    // Disable random errors for authentication to ensure reliable login

    const users = this.store.get('users') as User[]
    const user = users.find((u) => u.email === credentials.email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    // Simple password check (in real app, use proper hashing)
    const validPasswords: Record<string, string> = {
      'admin@dashboard.com': 'admin123',
      'user@dashboard.com': 'user123',
      'viewer@dashboard.com': 'viewer123',
    }

    if (validPasswords[credentials.email] !== credentials.password) {
      throw new Error('Invalid credentials')
    }

    const token = this.generateToken(user)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    // Store token and user
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token)
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }

    this.store.set('current_token', token)
    this.store.set('current_user', user)

    return {
      user,
      token,
      expiresAt,
      permissions: this.getUserPermissions(user.role),
    }
  }

  async logout(): Promise<void> {
    await this.delay(MOCK_DELAYS.AUTH)

    // Clear storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY)
      localStorage.removeItem(this.USER_KEY)
    }

    this.store.delete('current_token')
    this.store.delete('current_user')
  }

  async verifyToken(token: string): Promise<TokenVerification> {
    await this.delay(MOCK_DELAYS.AUTH / 2)

    if (!token) {
      return { valid: false }
    }

    const storedToken = this.store.get('current_token')
    const user = this.store.get('current_user') as User | null

    if (storedToken !== token || !user) {
      return { valid: false }
    }

    // Simple token validation (in real app, use JWT verification)
    return {
      valid: true,
      user,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    }
  }

  async getCurrentUser(token: string): Promise<User> {
    await this.delay(MOCK_DELAYS.AUTH / 2)

    const verification = await this.verifyToken(token)
    if (!verification.valid || !verification.user) {
      throw new Error('Invalid token')
    }

    return verification.user
  }

  private generateToken(user: User): string {
    return btoa(
      JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        timestamp: Date.now(),
      })
    )
  }

  private getUserPermissions(role: string): string[] {
    const permissions: Record<string, string[]> = {
      [USER_ROLES.ADMIN]: [
        'users:read',
        'users:write',
        'users:delete',
        'files:read',
        'files:write',
        'files:delete',
        'logs:read',
        'logs:write',
        'settings:read',
        'settings:write',
        'dashboard:read',
      ],
      [USER_ROLES.USER]: ['users:read', 'files:read', 'files:write', 'logs:read', 'dashboard:read'],
      [USER_ROLES.VIEWER]: ['users:read', 'files:read', 'logs:read', 'dashboard:read'],
    }

    return permissions[role] || []
  }

  // Helper method to get current auth state from storage
  getStoredAuthState(): { user: User | null; token: string | null } {
    if (typeof window === 'undefined') {
      return { user: null, token: null }
    }

    const token = localStorage.getItem(this.TOKEN_KEY)
    const userStr = localStorage.getItem(this.USER_KEY)
    const user = userStr ? JSON.parse(userStr) : null

    return { user, token }
  }
}

export const mockAuthService = new MockAuthService()
