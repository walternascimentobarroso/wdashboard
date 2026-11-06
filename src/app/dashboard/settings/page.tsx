'use client'

import { Bell, Globe, Mail, Palette } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useLocale } from '@/hooks/useLocale'

const STORAGE_KEY = 'userProfile'

const defaultSettings = {
  language: 'en-US',
  theme: 'system',
  emailNotifications: true,
  pushNotifications: false,
}

type UserSettings = typeof defaultSettings

function loadSettings(): UserSettings {
  const stored = localStorage.getItem(STORAGE_KEY)
  return { ...defaultSettings, ...(stored ? JSON.parse(stored) : {}) }
}

export default function SettingsPage() {
  const t = useTranslations()
  const { theme, setTheme } = useTheme()
  const { locale, changeLocale } = useLocale()
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    setSettings({
      ...loadSettings(),
      theme: theme || 'system',
      language: locale === 'pt' ? 'pt-BR' : 'en-US',
    })
  }, [theme, locale])

  const updateSetting = (field: keyof UserSettings, value: string | boolean) => {
    const next = { ...settings, [field]: value }
    setSettings(next)
    // Merge into the shared profile record so profile fields are kept
    const stored = localStorage.getItem(STORAGE_KEY)
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...(stored ? JSON.parse(stored) : {}), ...next })
    )

    if (field === 'theme') setTheme(value as string)
    if (field === 'language') changeLocale(value === 'pt-BR' ? 'pt' : 'en')
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Breadcrumb items={[{ label: t('common.settings') }]} />

      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('common.settings')}</h1>
      </div>

      {/* Notifications Section */}
      <Card className="w-full">
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
                <p className="text-sm text-muted-foreground">
                  {t('profile.notifications.emailNotificationsDesc')}
                </p>
              </div>
            </div>
            <Button
              variant={settings.emailNotifications ? 'default' : 'outline'}
              onClick={() => updateSetting('emailNotifications', !settings.emailNotifications)}
            >
              {settings.emailNotifications ? t('common.enabled') : t('common.disabled')}
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{t('profile.notifications.pushNotifications')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('profile.notifications.pushNotificationsDesc')}
                </p>
              </div>
            </div>
            <Button
              variant={settings.pushNotifications ? 'default' : 'outline'}
              onClick={() => updateSetting('pushNotifications', !settings.pushNotifications)}
            >
              {settings.pushNotifications ? t('common.enabled') : t('common.disabled')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Language & Theme Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            {t('profile.preferences.title')}
          </CardTitle>
          <CardDescription>{t('profile.preferences.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{t('profile.preferences.language')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('profile.preferences.languageDesc')}
                </p>
              </div>
            </div>
            <select
              className="px-3 py-2 border rounded-md bg-background"
              value={settings.language}
              onChange={(e) => updateSetting('language', e.target.value)}
            >
              <option value="pt-BR">{t('profile.preferences.portuguese')}</option>
              <option value="en-US">{t('profile.preferences.english')}</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Palette className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{t('profile.preferences.theme')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('profile.preferences.themeDesc')}
                </p>
              </div>
            </div>
            <select
              className="px-3 py-2 border rounded-md bg-background"
              value={settings.theme}
              onChange={(e) => updateSetting('theme', e.target.value)}
            >
              <option value="light">{t('profile.preferences.themeLight')}</option>
              <option value="dark">{t('profile.preferences.themeDark')}</option>
              <option value="system">{t('profile.preferences.themeSystem')}</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
