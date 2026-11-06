export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user'
  language: 'en' | 'pt'
  theme: 'light' | 'dark'
  createdAt: Date
  updatedAt: Date
}

export interface ActivityLog {
  id: string
  action: string
  description: string
  timestamp: Date
  type: 'login' | 'profile_update' | 'user_action' | 'system'
}
