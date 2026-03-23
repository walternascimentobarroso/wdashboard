'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    console.log('Dashboard useEffect triggered'); // Debug log
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    
    console.log('Dashboard auth check:', { isLoggedIn, email }); // Debug log
    
    if (isLoggedIn !== 'true' || !email) {
      console.log('Not logged in, redirecting to login'); // Debug log
      router.push('/login');
      return;
    }
    
    console.log('User is logged in, setting email'); // Debug log
    setUserEmail(email);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  if (!userEmail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {userEmail}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                User
              </span>
              <button 
                onClick={handleLogout} 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* KPI Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Performance Indicators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">1,234</p>
                <p className="text-sm text-green-600 mt-2">↑ 6.7%</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">89</p>
                <p className="text-sm text-red-600 mt-2">↓ 3.3%</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm font-medium text-gray-600">Files Processed</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">567</p>
                <p className="text-sm text-green-600 mt-2">↑ 8.4%</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">98.5%</p>
                <p className="text-sm text-green-600 mt-2">↑ 1.3%</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-sm font-medium text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">0.2%</p>
                <p className="text-sm text-green-600 mt-2">↓ 33.3%</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900">Manage Users</h4>
                <p className="text-sm text-gray-600 mt-1">Add, edit, or remove user accounts</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900">Upload Files</h4>
                <p className="text-sm text-gray-600 mt-1">Process and manage file uploads</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <h4 className="font-medium text-gray-900">View Logs</h4>
                <p className="text-sm text-gray-600 mt-1">Monitor system activity and errors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
