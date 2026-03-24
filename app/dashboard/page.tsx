'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Upload, Activity } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { KPICard } from '@/components/dashboard/kpi-card'
import { QuickActionCard, QuickActionGrid } from '@/components/dashboard/quick-action-card'

export default function DashboardPage() {
  const t = useTranslations()

  return (
    <>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb items={[]} />

        {/* Welcome Header */}
        <div>
          <h2 className="text-2xl font-bold">{t('header.dashboard')}</h2>
          <p className="text-muted-foreground">{t('dashboard.welcome')}</p>
        </div>

        {/* Enhanced KPI Cards */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t('dashboard.kpi.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <KPICard
              title={t('dashboard.kpi.totalUsers')}
              value="1,234"
              change={{ value: 6.7, trend: 'up' }}
              timeRange="Last 7 days"
              sparklineData={[1000, 1100, 1050, 1200, 1150, 1234]}
              tooltip="Total registered users in the system"
            />
            <KPICard
              title={t('dashboard.kpi.activeSessions')}
              value="89"
              change={{ value: 3.3, trend: 'down' }}
              timeRange="Last 7 days"
              sparklineData={[95, 92, 88, 91, 87, 89]}
              tooltip="Currently active user sessions"
            />
            <KPICard
              title={t('dashboard.kpi.filesProcessed')}
              value="567"
              change={{ value: 8.4, trend: 'up' }}
              timeRange="Last 7 days"
              sparklineData={[450, 480, 520, 490, 540, 567]}
              tooltip="Total files processed this week"
            />
            <KPICard
              title={t('dashboard.kpi.systemHealth')}
              value="98.5%"
              change={{ value: 1.3, trend: 'up' }}
              timeRange="Last 7 days"
              sparklineData={[97.2, 97.5, 97.8, 98.0, 98.2, 98.5]}
              tooltip="Overall system health score"
            />
            <KPICard
              title={t('dashboard.kpi.errorRate')}
              value="0.2%"
              change={{ value: 33.3, trend: 'down' }}
              timeRange="Last 7 days"
              sparklineData={[0.3, 0.28, 0.25, 0.23, 0.21, 0.2]}
              tooltip="System error rate percentage"
            />
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <Card glass>
          <CardHeader>
            <CardTitle>{t('dashboard.quickActions.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <QuickActionGrid>
              <QuickActionCard
                title={t('dashboard.quickActions.manageUsers')}
                description={t('dashboard.quickActions.manageUsersDesc')}
                icon={<Users className="h-5 w-5" />}
                href="/dashboard/users"
                buttonText="Manage Users"
              />
              <QuickActionCard
                title={t('dashboard.quickActions.uploadFiles')}
                description={t('dashboard.quickActions.uploadFilesDesc')}
                icon={<Upload className="h-5 w-5" />}
                href="/dashboard/files"
                buttonText="Upload Files"
              />
              <QuickActionCard
                title={t('dashboard.quickActions.viewLogs')}
                description={t('dashboard.quickActions.viewLogsDesc')}
                icon={<Activity className="h-5 w-5" />}
                href="/dashboard/logs"
                buttonText="View Logs"
              />
            </QuickActionGrid>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
