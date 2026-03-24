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

export interface SecurityForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ProfileFormData {
  name: string
  email: string
  avatar?: string
}

export interface PreferencesFormData {
  language: 'en' | 'pt'
  theme: 'light' | 'dark'
}
