'use client'

import { Bell, Calendar, Globe, Key, List, Mail, Palette, User, UserCog } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { PasswordChangeModal } from '@/components/profile/PasswordChangeModal'
import { PAGE_SIZE_OPTIONS } from '@/components/shared/data-table/data-table'
import { PageHeader } from '@/components/shared/page-header'
import { SettingsCard, SettingsRow } from '@/components/shared/settings-row'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useLocale } from '@/hooks/useLocale'
import { readJson } from '@/lib/read-json'
import { useAuth } from '@/modules/auth/components/AuthProvider'

const STORAGE_KEY = 'userProfile'

const defaultSettings = {
  language: 'en-US',
  theme: 'system',
  emailNotifications: true,
  pushNotifications: false,
  pageSize: 10,
}

type UserSettings = typeof defaultSettings

interface StoredProfile {
  name?: string
  email?: string
  avatar?: string
  joinDate?: string
}

function loadSettings(): UserSettings {
  return { ...defaultSettings, ...readJson(STORAGE_KEY, {}) }
}

const SELECT_CLASS = 'h-9 w-40 shrink-0'

export default function SettingsPage() {
  const t = useTranslations()
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const { locale, changeLocale } = useLocale()
  const [settings, setSettings] = useState(defaultSettings)
  const [profile, setProfile] = useState<StoredProfile>({})
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  useEffect(() => {
    setProfile(readJson<StoredProfile>(STORAGE_KEY, {}))
  }, [])

  useEffect(() => {
    setSettings({
      ...loadSettings(),
      theme: theme || 'system',
      language: locale === 'pt' ? 'pt-BR' : 'en-US',
    })
  }, [theme, locale])

  const updateSetting = (field: keyof UserSettings, value: string | boolean | number) => {
    const next = { ...settings, [field]: value }
    setSettings(next)
    // Merge into the shared profile record so profile fields are kept
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readJson(STORAGE_KEY, {}), ...next }))

    if (field === 'theme') setTheme(value as string)
    if (field === 'language') changeLocale(value === 'pt-BR' ? 'pt' : 'en')
  }

  const handlePasswordChange = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success(t('profile.toasts.passwordChanged'))
  }

  const name = profile.name || user?.name || ''
  const email = profile.email || user?.email || ''
  const avatar = profile.avatar || user?.avatar || undefined

  const toggleButton = (field: 'emailNotifications' | 'pushNotifications') => (
    <Button
      size="sm"
      variant={settings[field] ? 'default' : 'outline'}
      onClick={() => updateSetting(field, !settings[field])}
    >
      {settings[field] ? t('common.enabled') : t('common.disabled')}
    </Button>
  )

  return (
    <div className="container mx-auto space-y-6 py-6">
      <PageHeader
        title={t('common.settings')}
        description={t('settings.description')}
        breadcrumb={[{ label: t('common.settings') }]}
      />

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <Avatar className="size-16 rounded-xl">
          <AvatarImage src={avatar} className="rounded-xl" />
          <AvatarFallback className="rounded-xl text-lg">
            {name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-semibold">{name}</p>
          <p className="truncate text-sm text-muted-foreground">{email}</p>
          {profile.joinDate && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="size-3.5" aria-hidden="true" />
              {t('profile.joined')}: {profile.joinDate}
            </p>
          )}
        </div>
        <Button variant="outline" asChild>
          <Link href="/dashboard/profile">
            <UserCog />
            {t('profile.edit')}
          </Link>
        </Button>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <SettingsCard title={t('settings.account')} icon={<User />}>
          <SettingsRow
            icon={<User />}
            title={t('profile.personal.title')}
            description={t('profile.personal.description')}
            href="/dashboard/profile"
          />
          <SettingsRow
            icon={<Key />}
            title={t('profile.security.changePassword')}
            description={t('profile.security.passwordDesc')}
            onClick={() => setIsPasswordModalOpen(true)}
          />
          <SettingsRow
            icon={<Globe />}
            title={t('profile.preferences.language')}
            description={t('profile.preferences.languageDesc')}
            action={
              <Select
                value={settings.language}
                onValueChange={(value) => updateSetting('language', value)}
              >
                <SelectTrigger className={SELECT_CLASS}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">{t('profile.preferences.portuguese')}</SelectItem>
                  <SelectItem value="en-US">{t('profile.preferences.english')}</SelectItem>
                </SelectContent>
              </Select>
            }
          />
          <SettingsRow
            icon={<Mail />}
            title={t('profile.notifications.emailNotifications')}
            description={t('profile.notifications.emailNotificationsDesc')}
            action={toggleButton('emailNotifications')}
          />
          <SettingsRow
            icon={<Bell />}
            title={t('profile.notifications.pushNotifications')}
            description={t('profile.notifications.pushNotificationsDesc')}
            action={toggleButton('pushNotifications')}
          />
        </SettingsCard>

        <SettingsCard title={t('settings.appearance')} icon={<Palette />}>
          <SettingsRow
            icon={<Palette />}
            title={t('profile.preferences.theme')}
            description={t('profile.preferences.themeDesc')}
            action={
              <Select
                value={settings.theme}
                onValueChange={(value) => updateSetting('theme', value)}
              >
                <SelectTrigger className={SELECT_CLASS}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">{t('profile.preferences.themeLight')}</SelectItem>
                  <SelectItem value="dark">{t('profile.preferences.themeDark')}</SelectItem>
                  <SelectItem value="system">{t('profile.preferences.themeSystem')}</SelectItem>
                </SelectContent>
              </Select>
            }
          />
          <SettingsRow
            icon={<List />}
            title={t('profile.preferences.pageSize')}
            description={t('profile.preferences.pageSizeDesc')}
            action={
              <Select
                value={String(settings.pageSize)}
                onValueChange={(value) => updateSetting('pageSize', Number(value))}
              >
                <SelectTrigger className={SELECT_CLASS}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            }
          />
        </SettingsCard>
      </div>

      <PasswordChangeModal
        open={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        onSubmit={handlePasswordChange}
      />
    </div>
  )
}
