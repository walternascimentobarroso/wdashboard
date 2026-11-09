'use client'

import {
  Calendar,
  Download,
  Edit,
  Globe,
  Key,
  LogIn,
  MapPin,
  Settings,
  Shield,
  Trash2,
  Upload,
  User,
  UserPlus,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import type React from 'react'
import { useState } from 'react'
import { toast } from 'sonner'
import { PasswordChangeModal } from '@/components/profile/PasswordChangeModal'
import { PageHeader } from '@/components/shared/page-header'
import { SettingsCard, SettingsRow } from '@/components/shared/settings-row'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { readJson } from '@/lib/read-json'
import { useAuth } from '@/modules/auth/components/AuthProvider'

export default function ProfilePage() {
  const t = useTranslations()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  // State for editable user data
  const [userData, setUserData] = useState(() => {
    const stored = typeof window !== 'undefined' ? readJson('userProfile', null) : null
    if (stored) return stored
    return {
      name: user?.name || 'John Doe',
      email: user?.email || 'john.doe@example.com',
      phone: '+55 11 99999-9999',
      location: 'São Paulo, Brazil',
      website: 'https://johndoe.com',
      bio: t('profile.bio.default'),
      role: 'Administrator',
      department: t('profile.department.default'),
      avatar: user?.avatar || '',
      joinDate: '2024-01-15',
      lastLogin: '2024-03-24 10:30',
      language: 'en',
      theme: 'dark',
      timezone: 'America/Sao_Paulo',
      emailNotifications: true,
      pushNotifications: false,
      twoFactorEnabled: true,
    }
  })

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(userData))
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(t('profile.toasts.profileUpdated'))
      setIsEditing(false)
    } catch {
      toast.error(t('profile.toasts.updateError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setUserData((prev: typeof userData) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleCancelEdit = () => {
    const stored = readJson('userProfile', null)
    if (stored) setUserData(stored)
    setIsEditing(false)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        handleInputChange('avatar', base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePasswordChange = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(t('profile.toasts.passwordChanged'))
    } catch {
      toast.error(t('profile.toasts.passwordError'))
      throw new Error('Password change failed')
    }
  }

  const handleExportData = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success(t('profile.toasts.dataExported'))
    } catch {
      toast.error(t('profile.toasts.exportError'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageHeader
        title={t('profile.title')}
        description={t('profile.description')}
        breadcrumb={[{ label: t('profile.title') }]}
        actions={
          <>
            {isEditing && (
              <Button variant="outline" onClick={handleCancelEdit} disabled={isLoading}>
                {t('common.cancel')}
              </Button>
            )}
            <Button
              variant={isEditing ? 'default' : 'outline'}
              onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
              disabled={isLoading}
            >
              {isEditing ? t('profile.save') : t('profile.edit')}
            </Button>
          </>
        }
      />

      <Card glass className="w-full">
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative w-fit">
              <Avatar className="size-20 rounded-xl">
                <AvatarImage
                  src={userData.avatar || user?.avatar || undefined}
                  className="rounded-xl"
                />
                <AvatarFallback className="rounded-xl text-lg">
                  {userData.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <div className="absolute -bottom-2 -right-2">
                  <label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Upload className="h-4 w-4" />
                    </div>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="truncate text-xl">{userData.name}</CardTitle>
              <CardDescription className="truncate">{userData.email}</CardDescription>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{userData.role}</Badge>
                <Badge variant="outline">{userData.department}</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t('profile.joined')}:</span>
              <span>{userData.joinDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t('profile.location')}:</span>
              <span>{userData.location}</span>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-muted-foreground">{t('profile.website')}:</span>
              <a
                href={userData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate text-link hover:underline"
              >
                {userData.website}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="personal" className="space-y-4 w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personal">{t('profile.tabs.personal')}</TabsTrigger>
          <TabsTrigger value="security">{t('profile.tabs.security')}</TabsTrigger>
          <TabsTrigger value="activity">{t('profile.tabs.activity')}</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card glass className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-link" />
                {t('profile.personal.title')}
              </CardTitle>
              <CardDescription>{t('profile.personal.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('profile.personal.name')}</Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    value={userData.name}
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('profile.personal.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    spellCheck={false}
                    value={userData.email}
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('profile.personal.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    value={userData.phone}
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t('profile.personal.location')}</Label>
                  <Input
                    id="location"
                    autoComplete="address-level2"
                    value={userData.location}
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">{t('profile.website')}</Label>
                  <Input
                    id="website"
                    type="url"
                    autoComplete="url"
                    value={userData.website}
                    disabled={!isEditing}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">{t('profile.personal.role')}</Label>
                  <select
                    id="role"
                    className="flex h-11 w-full rounded-xl bg-muted px-3 text-sm disabled:opacity-50"
                    value={userData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    disabled={!isEditing}
                  >
                    <option value="Administrator">{t('profile.roleOptions.administrator')}</option>
                    <option value="Manager">{t('profile.roleOptions.manager')}</option>
                    <option value="Developer">{t('profile.roleOptions.developer')}</option>
                    <option value="User">{t('profile.roleOptions.user')}</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{t('profile.personal.bio')}</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] resize-none rounded-xl bg-muted p-3 text-sm disabled:opacity-50"
                  value={userData.bio}
                  disabled={!isEditing}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <SettingsCard title={t('profile.security.title')} icon={<Shield />}>
            <SettingsRow
              icon={<Key />}
              title={t('profile.security.password')}
              description={t('profile.security.passwordDesc')}
              action={
                <Button size="sm" variant="outline" onClick={() => setIsPasswordModalOpen(true)}>
                  {t('profile.security.changePassword')}
                </Button>
              }
            />
            <SettingsRow
              icon={<Shield />}
              title={t('profile.security.twoFactor')}
              description={
                userData.twoFactorEnabled
                  ? t('profile.security.twoFactorEnabled')
                  : t('profile.security.twoFactorDisabled')
              }
              action={
                <Button
                  size="sm"
                  variant={userData.twoFactorEnabled ? 'destructive' : 'default'}
                  onClick={() => handleInputChange('twoFactorEnabled', !userData.twoFactorEnabled)}
                  disabled={!isEditing}
                >
                  {userData.twoFactorEnabled
                    ? t('profile.security.disableTwoFactor')
                    : t('profile.security.enableTwoFactor')}
                </Button>
              }
            />
          </SettingsCard>

          <SettingsCard title={t('profile.data.title')} icon={<Download />}>
            <SettingsRow
              icon={<Download />}
              title={t('profile.data.exportData')}
              description={t('profile.data.exportDataDesc')}
              action={
                <Button size="sm" variant="outline" onClick={handleExportData} disabled={isLoading}>
                  {t('profile.data.export')}
                </Button>
              }
            />
            <div className="flex flex-col gap-3 bg-destructive/10 px-5 py-4 sm:flex-row sm:items-center">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-destructive/30 text-destructive">
                <Trash2 className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-destructive">
                  {t('profile.data.deleteAccount')}
                </p>
                <p className="text-xs text-destructive">{t('profile.data.deleteAccountDesc')}</p>
              </div>
              <Button size="sm" variant="destructive">
                {t('profile.data.deleteAccount')}
              </Button>
            </div>
          </SettingsCard>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <div className="space-y-6">
            {/* Activity List */}
            <div className="glass rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">{t('profile.activity.recentActivity')}</h3>
              <div className="space-y-4">
                {[
                  {
                    action: 'login',
                    title: t('profile.activity.activities.login'),
                    description: t('profile.activity.activities.descriptions.login'),
                    time: t('profile.activity.times.dayAgo', { count: 1 }),
                    category: t('profile.activity.categories.login'),
                    categoryClass: 'bg-info/20 text-info',
                    iconBg: 'bg-success/20',
                    iconColor: 'text-success',
                    icon: LogIn,
                  },
                  {
                    action: 'edit',
                    title: t('profile.activity.activities.edit'),
                    description: t('profile.activity.activities.descriptions.edit'),
                    time: t('profile.activity.times.hoursAgo', { count: 2 }),
                    category: t('profile.activity.categories.profileUpdate'),
                    categoryClass: 'bg-muted text-muted-foreground',
                    iconBg: 'bg-info/20',
                    iconColor: 'text-info',
                    icon: User,
                  },
                  {
                    action: 'delete',
                    title: t('profile.activity.activities.delete'),
                    description: t('profile.activity.activities.descriptions.delete'),
                    time: t('profile.activity.times.hoursAgo', { count: 3 }),
                    category: t('profile.activity.categories.userAction'),
                    categoryClass: 'bg-muted text-muted-foreground',
                    iconBg: 'bg-destructive/20',
                    iconColor: 'text-destructive',
                    icon: Trash2,
                  },
                  {
                    action: 'create',
                    title: t('profile.activity.activities.create'),
                    description: t('profile.activity.activities.descriptions.create'),
                    time: t('profile.activity.times.hoursAgo', { count: 5 }),
                    category: t('profile.activity.categories.userAction'),
                    categoryClass: 'bg-muted text-muted-foreground',
                    iconBg: 'bg-success/20',
                    iconColor: 'text-success',
                    icon: UserPlus,
                  },
                  {
                    action: 'password',
                    title: t('profile.activity.activities.password'),
                    description: t('profile.activity.activities.descriptions.password'),
                    time: t('profile.activity.times.dayAgo', { count: 1 }),
                    category: t('profile.activity.categories.security'),
                    categoryClass: 'bg-warning/20 text-warning',
                    iconBg: 'bg-warning/20',
                    iconColor: 'text-warning',
                    icon: Key,
                  },
                  {
                    action: 'export',
                    title: t('profile.activity.activities.export'),
                    description: t('profile.activity.activities.descriptions.export'),
                    time: t('profile.activity.times.daysAgo', { count: 2 }),
                    category: t('profile.activity.categories.system'),
                    categoryClass: 'bg-primary-soft text-link',
                    iconBg: 'bg-primary-soft',
                    iconColor: 'text-link',
                    icon: Download,
                  },
                ].map((activity) => (
                  <div key={activity.action} className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${activity.iconBg} ${activity.iconColor}`}
                    >
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{activity.title}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${activity.categoryClass}`}
                        >
                          {activity.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Section */}
            <div className="glass rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">{t('profile.activity.summary')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-xl bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold tabular-nums text-success">12</p>
                      <p className="text-sm text-muted-foreground">
                        {t('profile.activity.summaryItems.logins')}
                      </p>
                    </div>
                    <LogIn className="h-8 w-8 text-success/30" />
                  </div>
                </div>
                <div className="rounded-xl bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold tabular-nums text-info">8</p>
                      <p className="text-sm text-muted-foreground">
                        {t('profile.activity.summaryItems.updates')}
                      </p>
                    </div>
                    <Edit className="h-8 w-8 text-info/30" />
                  </div>
                </div>
                <div className="rounded-xl bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold tabular-nums text-warning">15</p>
                      <p className="text-sm text-muted-foreground">
                        {t('profile.activity.summaryItems.actions')}
                      </p>
                    </div>
                    <UserPlus className="h-8 w-8 text-warning/30" />
                  </div>
                </div>
                <div className="rounded-xl bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold tabular-nums text-link">6</p>
                      <p className="text-sm text-muted-foreground">
                        {t('profile.activity.summaryItems.system')}
                      </p>
                    </div>
                    <Settings className="h-8 w-8 text-link/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Password Change Modal */}
      <PasswordChangeModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        onSubmit={handlePasswordChange}
        isLoading={isLoading}
      />
    </div>
  )
}
