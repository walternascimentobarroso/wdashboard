'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

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
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userEmail', email)
      setIsLoading(false)
      router.push('/dashboard')
    } else {
      setIsLoading(false)
      setError('Invalid credentials')
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>

            {error && (
              <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50"
              disabled={isLoading}
              onClick={() => {
                // Button click
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* Debug button */}
            <button
              type="button"
              className="w-full bg-destructive text-destructive-foreground py-2 px-4 rounded-md hover:bg-destructive/90"
              onClick={() => {
                alert(`Email: ${email}, Password: ${password}`)
              }}
            >
              Debug: Show current values
            </button>
          </form>

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
