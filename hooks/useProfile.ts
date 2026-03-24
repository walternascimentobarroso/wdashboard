'use client'

import { useState, useEffect } from 'react'
import type { UserProfile, ActivityLog } from '@/types'

const PROFILE_STORAGE_KEY = 'user_profile'
const ACTIVITY_STORAGE_KEY = 'user_activity'

const DEFAULT_PROFILE: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin',
  language: 'en',
  theme: 'light',
  createdAt: new Date(),
  updatedAt: new Date(),
}

const MOCK_ACTIVITY: ActivityLog[] = [
  {
    id: '1',
    action: 'login',
    description: 'Logged in to dashboard',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    type: 'login',
  },
  {
    id: '2',
    action: 'profile_update',
    description: 'Updated profile information',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    type: 'profile_update',
  },
  {
    id: '3',
    action: 'user_delete',
    description: 'Deleted user account',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: 'user_action',
  },
]

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE)
  const [isLoading, setIsLoading] = useState(true)

  // Load profile from localStorage on mount
  useEffect(() => {
    try {
      let saved = null
      try {
        saved = localStorage.getItem(PROFILE_STORAGE_KEY)
      } catch (error) {
        console.error('Failed to get profile from localStorage:', error)
      }
      if (saved) {
        const parsedProfile = JSON.parse(saved)
        // Convert date strings back to Date objects
        parsedProfile.createdAt = new Date(parsedProfile.createdAt)
        parsedProfile.updatedAt = new Date(parsedProfile.updatedAt)
        setProfile(parsedProfile)
      } else {
        // Save default profile if none exists
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE))
      }
    } catch (error) {
      console.error('Failed to load profile from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Update profile and save to localStorage
  const updateProfile = (updates: Partial<UserProfile>) => {
    const updatedProfile = {
      ...profile,
      ...updates,
      updatedAt: new Date(),
    }

    setProfile(updatedProfile)

    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile))
    } catch (error) {
      console.error('Failed to save profile to localStorage:', error)
    }

    return updatedProfile
  }

  // Update avatar
  const updateAvatar = (avatar: string) => {
    try {
      return updateProfile({ avatar })
    } catch (error) {
      console.error('Failed to update avatar:', error)
      // Failed to update avatar
    }
  }

  const updatePreferences = (language: 'en' | 'pt', theme: 'light' | 'dark') => {
    return updateProfile({ language, theme })
  }

  return {
    profile,
    isLoading,
    updateProfile,
    updateAvatar,
    updatePreferences,
  }
}

export function useUserActivity() {
  const [activities, setActivities] = useState<ActivityLog[]>(MOCK_ACTIVITY)
  const [isLoading, setIsLoading] = useState(true)

  // Load activities from localStorage on mount
  useEffect(() => {
    try {
      let saved = null
      try {
        saved = localStorage.getItem(ACTIVITY_STORAGE_KEY)
      } catch (error) {
        console.error('Failed to get activities from localStorage:', error)
      }
      if (saved) {
        const parsedActivities = JSON.parse(saved)
        // Convert date strings back to Date objects
        const activitiesWithDates = parsedActivities.map((activity: ActivityLog) => ({
          ...activity,
          timestamp: new Date(activity.timestamp),
        }))
        setActivities(activitiesWithDates)
      } else {
        // Save default activities if none exist
        localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(MOCK_ACTIVITY))
      }
    } catch (error) {
      console.error('Failed to load activities from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Add new activity
  const addActivity = (activity: Omit<ActivityLog, 'id' | 'timestamp'>) => {
    const newActivity: ActivityLog = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date(),
    }

    const updatedActivities = [newActivity, ...activities]
    setActivities(updatedActivities)

    try {
      localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updatedActivities))
    } catch (error) {
      console.error('Failed to save activities to localStorage:', error)
    }

    return newActivity
  }

  return {
    activities,
    isLoading,
    addActivity,
  }
}
