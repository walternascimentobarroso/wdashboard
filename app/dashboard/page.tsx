'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/modules/auth/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { KPICard } from '@/modules/dashboard/components/KPICard';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { mockDashboardService } from '@/modules/dashboard/services/dashboard';
import { KPI, ChartData } from '@/types/kpi';
import { useToastHelpers } from '@/components/shared/Toast';

export default function DashboardPage() {
  const { user, logout, isLoading } = useAuth();
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [lineChartData, setLineChartData] = useState<ChartData | null>(null);
  const [barChartData, setBarChartData] = useState<ChartData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const toast = useToastHelpers();

  const loadDashboardData = async () => {
    try {
      const [kpiResponse, lineResponse, barResponse] = await Promise.all([
        mockDashboardService.getKPIs(),
        mockDashboardService.getChartData({ type: 'line', metric: 'Users', timeRange: '7d' }),
        mockDashboardService.getChartData({ type: 'bar', metric: 'Files', timeRange: '7d' }),
      ]);

      setKpis(kpiResponse.data);
      setLineChartData(lineResponse);
      setBarChartData(barResponse);
    } catch (error) {
      toast.error('Failed to load dashboard data', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      const response = await mockDashboardService.getKPIs({ refresh: true });
      setKpis(response.data);
      toast.success('Dashboard data refreshed');
    } catch (error) {
      toast.error('Failed to refresh data', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

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

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {user.role}
              </span>
              <Button 
                onClick={refreshData} 
                variant="outline" 
                disabled={isRefreshing}
              >
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
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
              {kpis.map((kpi) => (
                <KPICard key={kpi.id} kpi={kpi} />
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Activity (7 days)</h3>
              {lineChartData ? (
                <LineChart data={lineChartData} />
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Loading chart data...
                </div>
              )}
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">File Processing (7 days)</h3>
              {barChartData ? (
                <BarChart data={barChartData} />
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Loading chart data...
                </div>
              )}
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
