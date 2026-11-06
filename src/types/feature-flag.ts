export interface FeatureFlag {
  id: string
  name: string
  enabled: boolean
  description: string
  category: string
  requiredRole: 'admin' | 'user' | 'viewer' | null
  updatedAt: Date
  updatedBy: string | null
}

export interface UpdateFeatureFlagRequest {
  enabled: boolean
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system'
  language: string
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    desktop: boolean
  }
}
