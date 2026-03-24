'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { LoginForm } from '@/modules/auth/components/LoginForm'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async (email: string, password: string) => {
    // Simple validation
    const validCredentials = [
      { email: 'admin@dashboard.com', password: 'admin123' },
      { email: 'user@dashboard.com', password: 'user123' },
      { email: 'viewer@dashboard.com', password: 'viewer123' },
    ]

    const isValid = validCredentials.some(
      (cred) => cred.email === email && cred.password === password
    )

    if (isValid) {
      // Store simple session
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userEmail', email)

      // Redirect to dashboard
      router.push('/dashboard')

      return { success: true }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-foreground">
            Sign in to Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Enter your credentials to access the dashboard
          </p>
        </div>

        <div className="bg-card py-8 px-6 shadow-lg rounded-lg border">
          <LoginForm onLogin={handleLogin} />

          <div className="text-center text-sm text-muted-foreground mt-6">
            <p>Demo credentials:</p>
            <p>Admin: admin@dashboard.com / admin123</p>
            <p>User: user@dashboard.com / user123</p>
            <p>Viewer: viewer@dashboard.com / viewer123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
