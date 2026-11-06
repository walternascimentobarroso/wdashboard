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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
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
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: t('profile.title') }]} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('profile.title')}</h1>
          <p className="text-muted-foreground">{t('profile.description')}</p>
        </div>
        <div className="flex gap-2">
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
        </div>
      </div>

      {/* Profile Overview Card */}
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.avatar || user?.avatar || undefined} />
                <AvatarFallback className="text-lg">
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
            <div className="flex-1">
              <CardTitle className="text-2xl">{userData.name}</CardTitle>
              <CardDescription className="text-base">{userData.email}</CardDescription>
              <div className="flex items-center gap-2 mt-2">
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
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t('profile.website')}:</span>
              <a
                href={userData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
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
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
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
                    className="px-3 py-2 border rounded-md bg-background"
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
                  className="w-full min-h-[100px] p-3 border rounded-md resize-none"
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
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t('profile.security.title')}
              </CardTitle>
              <CardDescription>{t('profile.security.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('profile.security.password')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('profile.security.passwordDesc')}
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setIsPasswordModalOpen(true)}>
                  {t('profile.security.changePassword')}
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('profile.security.twoFactor')}</p>
                    <p className="text-sm text-muted-foreground">
                      {userData.twoFactorEnabled
                        ? t('profile.security.twoFactorEnabled')
                        : t('profile.security.twoFactorDisabled')}
                    </p>
                  </div>
                </div>
                <Button
                  variant={userData.twoFactorEnabled ? 'destructive' : 'default'}
                  onClick={() => handleInputChange('twoFactorEnabled', !userData.twoFactorEnabled)}
                  disabled={!isEditing}
                >
                  {userData.twoFactorEnabled
                    ? t('profile.security.disableTwoFactor')
                    : t('profile.security.enableTwoFactor')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Management Section */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                {t('profile.data.title')}
              </CardTitle>
              <CardDescription>{t('profile.data.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('profile.data.exportData')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('profile.data.exportDataDesc')}
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleExportData} disabled={isLoading}>
                  {t('profile.data.export')}
                </Button>
              </div>
              <Separator />
              <div className="p-4 border rounded-lg border-destructive/30 bg-destructive/10">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">
                      {t('profile.data.deleteAccount')}
                    </p>
                    <p className="text-sm text-destructive">
                      {t('profile.data.deleteAccountDesc')}
                    </p>
                  </div>
                </div>
                <Button variant="destructive" className="mt-3">
                  {t('profile.data.deleteAccount')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          <div className="space-y-6">
            {/* Activity List */}
            <div className="rounded-xl bg-card p-6">
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
                    categoryClass: 'bg-primary/20 text-primary',
                    iconBg: 'bg-primary/20',
                    iconColor: 'text-primary',
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
            <div className="rounded-xl bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">{t('profile.activity.summary')}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg bg-muted p-4">
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
                <div className="rounded-lg bg-muted p-4">
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
                <div className="rounded-lg bg-muted p-4">
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
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold tabular-nums text-primary">6</p>
                      <p className="text-sm text-muted-foreground">
                        {t('profile.activity.summaryItems.system')}
                      </p>
                    </div>
                    <Settings className="h-8 w-8 text-primary/30" />
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
