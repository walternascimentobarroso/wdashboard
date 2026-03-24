'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/modules/auth/components/AuthProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Globe,
  Shield,
  Key,
  Bell,
  Palette,
  CreditCard,
  Download,
  Upload,
} from 'lucide-react'
import { toast } from 'sonner'

export default function ProfilePage() {
  const t = useTranslations()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data - in real app, this would come from auth context or API
  const userData = {
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+55 11 99999-9999',
    location: 'São Paulo, Brazil',
    website: 'https://johndoe.com',
    bio: t('profile.bio.default'),
    role: 'Administrator',
    department: t('profile.department.default'),
    joinDate: '2024-01-15',
    lastLogin: '2024-03-24 10:30',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    emailNotifications: true,
    pushNotifications: false,
    twoFactorEnabled: true,
  }

  const handleSaveProfile = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(t('profile.toasts.profileUpdated'))
      setIsEditing(false)
    } catch (error) {
      toast.error(t('profile.toasts.updateError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(t('profile.toasts.passwordChanged'))
    } catch (error) {
      toast.error(t('profile.toasts.passwordError'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleExportData = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(t('profile.toasts.dataExported'))
    } catch (error) {
      toast.error(t('profile.toasts.exportError'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('profile.title')}</h1>
          <p className="text-muted-foreground">{t('profile.description')}</p>
        </div>
        <Button
          variant={isEditing ? 'default' : 'outline'}
          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          disabled={isLoading}
        >
          {isEditing ? t('profile.save') : t('profile.edit')}
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user?.avatar || undefined} />
              <AvatarFallback className="text-lg">
                {userData.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
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
              <a href={userData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {userData.website}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tabs */}
      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">{t('profile.tabs.personal')}</TabsTrigger>
          <TabsTrigger value="security">{t('profile.tabs.security')}</TabsTrigger>
          <TabsTrigger value="notifications">{t('profile.tabs.notifications')}</TabsTrigger>
          <TabsTrigger value="data">{t('profile.tabs.data')}</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-4">
          <Card>
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
                    value={userData.name}
                    disabled={!isEditing}
                    onChange={(e) => {/* Handle change */}}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('profile.personal.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userData.email}
                    disabled={!isEditing}
                    onChange={(e) => {/* Handle change */}}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('profile.personal.phone')}</Label>
                  <Input
                    id="phone"
                    value={userData.phone}
                    disabled={!isEditing}
                    onChange={(e) => {/* Handle change */}}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">{t('profile.personal.location')}</Label>
                  <Input
                    id="location"
                    value={userData.location}
                    disabled={!isEditing}
                    onChange={(e) => {/* Handle change */}}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">{t('profile.personal.bio')}</Label>
                <textarea
                  id="bio"
                  className="w-full min-h-[100px] p-3 border rounded-md resize-none"
                  value={userData.bio}
                  disabled={!isEditing}
                  onChange={(e) => {/* Handle change */}}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
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
                    <p className="text-sm text-muted-foreground">{t('profile.security.passwordDesc')}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handlePasswordChange} disabled={isLoading}>
                  {t('profile.security.changePassword')}
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('profile.security.twoFactor')}</p>
                    <p className="text-sm text-muted-foreground">
                      {userData.twoFactorEnabled ? t('profile.security.twoFactorEnabled') : t('profile.security.twoFactorDisabled')}
                    </p>
                  </div>
                </div>
                <Button variant={userData.twoFactorEnabled ? 'destructive' : 'default'}>
                  {userData.twoFactorEnabled ? t('profile.security.disableTwoFactor') : t('profile.security.enableTwoFactor')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {t('profile.notifications.title')}
              </CardTitle>
              <CardDescription>{t('profile.notifications.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('profile.notifications.emailNotifications')}</p>
                    <p className="text-sm text-muted-foreground">{t('profile.notifications.emailNotificationsDesc')}</p>
                  </div>
                </div>
                <Button variant={userData.emailNotifications ? 'default' : 'outline'}>
                  {userData.emailNotifications ? t('common.enabled') : t('common.disabled')}
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{t('profile.notifications.pushNotifications')}</p>
                    <p className="text-sm text-muted-foreground">{t('profile.notifications.pushNotificationsDesc')}</p>
                  </div>
                </div>
                <Button variant={userData.pushNotifications ? 'default' : 'outline'}>
                  {userData.pushNotifications ? t('common.enabled') : t('common.disabled')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management Tab */}
        <TabsContent value="data" className="space-y-4">
          <Card>
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
                    <p className="text-sm text-muted-foreground">{t('profile.data.exportDataDesc')}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleExportData} disabled={isLoading}>
                  {t('profile.data.export')}
                </Button>
              </div>
              <Separator />
              <div className="p-4 border rounded-lg border-red-200 bg-red-50">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">{t('profile.data.deleteAccount')}</p>
                    <p className="text-sm text-red-600">{t('profile.data.deleteAccountDesc')}</p>
                  </div>
                </div>
                <Button variant="destructive" className="mt-3">
                  {t('profile.data.deleteAccount')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
