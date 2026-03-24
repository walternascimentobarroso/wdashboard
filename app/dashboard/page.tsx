'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Upload, Activity } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations();
  
  return (
    <>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h2 className="text-2xl font-bold">{t('header.dashboard')}</h2>
          <p className="text-muted-foreground">{t('dashboard.welcome')}</p>
        </div>

        {/* KPI Cards */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('dashboard.kpi.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <Card glass>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.kpi.totalUsers')}</p>
                <p className="text-2xl font-bold mt-2">1,234</p>
                <p className="text-sm text-green-600 mt-2">↑ 6.7%</p>
              </CardContent>
            </Card>
            <Card glass>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.kpi.activeSessions')}</p>
                <p className="text-2xl font-bold mt-2">89</p>
                <p className="text-sm text-red-600 mt-2">↓ 3.3%</p>
              </CardContent>
            </Card>
            <Card glass>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.kpi.filesProcessed')}</p>
                <p className="text-2xl font-bold mt-2">567</p>
                <p className="text-sm text-green-600 mt-2">↑ 8.4%</p>
              </CardContent>
            </Card>
            <Card glass>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.kpi.systemHealth')}</p>
                <p className="text-2xl font-bold mt-2">98.5%</p>
                <p className="text-sm text-green-600 mt-2">↑ 1.3%</p>
              </CardContent>
            </Card>
            <Card glass>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">{t('dashboard.kpi.errorRate')}</p>
                <p className="text-2xl font-bold mt-2">0.2%</p>
                <p className="text-sm text-green-600 mt-2">↓ 33.3%</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card glass>
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5" />
                  <h4 className="font-medium">{t('dashboard.quickActions.manageUsers')}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{t('dashboard.quickActions.manageUsersDesc')}</p>
              </div>
              <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2 mb-2">
                  <Upload className="h-5 w-5" />
                  <h4 className="font-medium">{t('dashboard.quickActions.uploadFiles')}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{t('dashboard.quickActions.uploadFilesDesc')}</p>
              </div>
              <div className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="h-5 w-5" />
                  <h4 className="font-medium">{t('dashboard.quickActions.viewLogs')}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{t('dashboard.quickActions.viewLogsDesc')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
