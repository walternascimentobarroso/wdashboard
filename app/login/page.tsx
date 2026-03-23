'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/modules/auth/components/LoginForm';
import { useAuth } from '@/modules/auth/components/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null; // Will redirect
  }

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
          <LoginForm onSuccess={() => router.push('/dashboard')} />
        </div>
      </div>
    </div>
  );
}
