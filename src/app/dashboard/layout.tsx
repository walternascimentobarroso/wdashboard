'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { AuthProvider } from '@/modules/auth/components/AuthProvider'

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    // Check if user is logged in
    let isLoggedIn = null
    let email = null
    try {
      isLoggedIn = localStorage.getItem('isLoggedIn')
      email = localStorage.getItem('userEmail')
    } catch (error) {
      console.error('Failed to get auth data:', error)
    }

    if (isLoggedIn !== 'true' || !email) {
      try {
        router.push('/login')
      } catch (error) {
        console.error('Failed to redirect to login:', error)
      }
      return
    }

    setUserEmail(email)
  }, [router])

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthProvider>
  )
}
