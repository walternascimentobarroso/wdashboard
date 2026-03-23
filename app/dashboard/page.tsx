'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Sidebar, SidebarItem } from '@/components/layout/Sidebar';
import { Home, BarChart3, FileText, Settings, Users, Upload, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <DashboardLayout>
      <Sidebar>
        <SidebarItem
          icon={<Home className="h-4 w-4" />}
          label="Dashboard"
          href="/dashboard"
          active={true}
        />
        <SidebarItem
          icon={<BarChart3 className="h-4 w-4" />}
          label="Analytics"
          href="/dashboard/analytics"
        />
        <SidebarItem
          icon={<Users className="h-4 w-4" />}
          label="Users"
          href="/dashboard/users"
        />
        <SidebarItem
          icon={<FileText className="h-4 w-4" />}
          label="Files"
          href="/dashboard/files"
        />
        <SidebarItem
          icon={<Activity className="h-4 w-4" />}
          label="Logs"
          href="/dashboard/logs"
        />
        <SidebarItem
          icon={<Settings className="h-4 w-4" />}
          label="Settings"
          href="/dashboard/settings"
        />
      </Sidebar>
      
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="text-muted-foreground">Welcome back, {userEmail}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
              User
            </span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Key Performance Indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <Card glass>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold mt-2">1,234</p>
                <p className="text-sm text-green-600 mt-2">↑ 6.7%</p>
              </CardContent>
            </Card>
            <Card glass>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold mt-2">89</p>
                <p className="text-sm text-red-600 mt-2">↓ 3.3%</p>
              </CardContent>
            </Card>
            <Card glass>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Files Processed</p>
                <p className="text-2xl font-bold mt-2">567</p>
                <p className="text-sm text-green-600 mt-2">↑ 8.4%</p>
              </CardContent>
            </Card>
            <Card glass>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">System Health</p>
                <p className="text-2xl font-bold mt-2">98.5%</p>
                <p className="text-sm text-green-600 mt-2">↑ 1.3%</p>
              </CardContent>
            </Card>
            <Card glass>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Error Rate</p>
                <p className="text-2xl font-bold mt-2">0.2%</p>
                <p className="text-sm text-green-600 mt-2">↓ 33.3%</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card glass>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5" />
                  <h4 className="font-medium">Manage Users</h4>
                </div>
                <p className="text-sm text-muted-foreground">Add, edit, or remove user accounts</p>
              </div>
              <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2 mb-2">
                  <Upload className="h-5 w-5" />
                  <h4 className="font-medium">Upload Files</h4>
                </div>
                <p className="text-sm text-muted-foreground">Process and manage file uploads</p>
              </div>
              <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="h-5 w-5" />
                  <h4 className="font-medium">View Logs</h4>
                </div>
                <p className="text-sm text-muted-foreground">Monitor system activity and errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
