'use client'

import { Activity, ChevronRight, FileText, HeartPulse, Upload, Users } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { KPICard } from '@/components/dashboard/kpi-card'
import { ProgressRingCard } from '@/components/dashboard/progress-ring-card'
import { QuickActionCard, QuickActionGrid } from '@/components/dashboard/quick-action-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUsers } from '@/features/users/hooks/useUsers'
import { useAuth } from '@/modules/auth/components/AuthProvider'

function greetingKey(hour: number) {
  if (hour < 12) return 'morning'
  if (hour < 18) return 'afternoon'
  return 'evening'
}

export default function DashboardPage() {
  const t = useTranslations()
  const { user } = useAuth()
  const { items: users, loading } = useUsers()

  const activeUsers = users.filter((member) => member.status === 'active').length
  const activePercent = users.length ? Math.round((activeUsers / users.length) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="text-muted-foreground">
            {t(`dashboard.greeting.${greetingKey(new Date().getHours())}`, {
              name: user?.name ?? '',
            })}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">{t('header.dashboard')}</h1>
          <p className="text-sm text-muted-foreground">{t('dashboard.welcome')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/users">{t('dashboard.quickActions.manageUsers')}</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/files">
              <Upload />
              {t('dashboard.quickActions.uploadFiles')}
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KPICard
          loading={loading}
          title={t('dashboard.kpi.totalUsers')}
          value="1,234"
          icon={<Users />}
          change={{ value: 6.7, trend: 'up' }}
          sparklineData={[1000, 1100, 1050, 1200, 1150, 1234]}
          tooltip="Total registered users in the system"
        />
        <KPICard
          loading={loading}
          title={t('dashboard.kpi.activeSessions')}
          value="89"
          icon={<Activity />}
          change={{ value: 3.3, trend: 'down' }}
          sparklineData={[95, 92, 88, 91, 87, 89]}
          tooltip="Currently active user sessions"
        />
        <KPICard
          loading={loading}
          title={t('dashboard.kpi.filesProcessed')}
          value="567"
          icon={<FileText />}
          change={{ value: 8.4, trend: 'up' }}
          sparklineData={[450, 480, 520, 490, 540, 567]}
          tooltip="Total files processed this week"
        />
        <KPICard
          loading={loading}
          title={t('dashboard.kpi.systemHealth')}
          value="98.5%"
          icon={<HeartPulse />}
          change={{ value: 1.3, trend: 'up' }}
          sparklineData={[97.2, 97.5, 97.8, 98.0, 98.2, 98.5]}
          tooltip="Overall system health score"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">{t('dashboard.quickActions.title')}</CardTitle>
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

        <ProgressRingCard
          title={t('dashboard.accounts.title')}
          percent={activePercent}
          loading={loading}
          ringLabel={t('dashboard.accounts.active')}
          rows={[
            { label: t('dashboard.accounts.total'), value: users.length },
            { label: t('dashboard.accounts.active'), value: activeUsers, tone: 'positive' },
            {
              label: t('dashboard.accounts.inactive'),
              value: users.length - activeUsers,
              tone: 'negative',
            },
            {
              label: t('dashboard.accounts.admins'),
              value: users.filter((member) => member.role === 'admin').length,
            },
          ]}
          footer={
            <Link
              href="/dashboard/users"
              className="flex items-center gap-1 text-xs font-medium text-link hover:underline"
            >
              {t('dashboard.accounts.manage')}
              <ChevronRight className="size-3" />
            </Link>
          }
        />
      </div>
    </div>
  )
}
