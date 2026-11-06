'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '@/modules/auth/components/AuthProvider'
import { LoginForm } from '@/modules/auth/components/LoginForm'

export default function LoginPage() {
  const router = useRouter()

  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) router.replace('/dashboard')
  }, [isAuthenticated, router])

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
          <LoginForm onSuccess={() => router.push('/dashboard')} />

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
