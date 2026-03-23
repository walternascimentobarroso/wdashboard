'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    setError('');
    setIsLoading(true);

    // Simple validation
    const validCredentials = [
      { email: 'admin@dashboard.com', password: 'admin123' },
      { email: 'user@dashboard.com', password: 'user123' },
      { email: 'viewer@dashboard.com', password: 'viewer123' },
    ];

    const isValid = validCredentials.some(
      cred => cred.email === email && cred.password === password
    );

    console.log('Credentials valid:', isValid, 'Email:', email, 'Password:', password); // Debug log

    if (isValid) {
      // Store simple session
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      console.log('Data stored in localStorage:', {
        isLoggedIn: localStorage.getItem('isLoggedIn'),
        userEmail: localStorage.getItem('userEmail')
      }); // Debug log
      console.log('Redirecting to dashboard'); // Debug log
      
      // Add small delay to ensure localStorage is set
      setTimeout(() => {
        router.push('/dashboard');
      }, 100);
    } else {
      setError('Invalid credentials');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access the dashboard
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={isLoading}
              onClick={(e) => {
                console.log('Button clicked'); // Debug log
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
            
            {/* Debug button */}
            <button
              type="button"
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              onClick={() => {
                console.log('Debug button clicked');
                console.log('Current email:', email);
                console.log('Current password:', password);
                alert(`Email: ${email}, Password: ${password}`);
              }}
            >
              Debug: Show current values
            </button>
          </form>

          <div className="text-center text-sm text-gray-600 mt-6">
            <p>Demo credentials:</p>
            <p>Admin: admin@dashboard.com / admin123</p>
            <p>User: user@dashboard.com / user123</p>
            <p>Viewer: viewer@dashboard.com / viewer123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
