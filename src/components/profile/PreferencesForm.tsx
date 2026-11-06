'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useForm, ControllerRenderProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import { useTheme } from 'next-themes'
import { Globe, Palette, Moon, Sun } from 'lucide-react'
import type { UserProfile } from '@/types'

const preferencesFormSchema = z.object({
  language: z.enum(['en', 'pt']),
  theme: z.enum(['light', 'dark']),
})

type PreferencesFormValues = z.infer<typeof preferencesFormSchema>

interface PreferencesFormProps {
  profile: UserProfile
  onPreferencesUpdate: (language: 'en' | 'pt', theme: 'light' | 'dark') => void
}

export function PreferencesForm({ profile, onPreferencesUpdate }: PreferencesFormProps) {
  const [hasChanges, setHasChanges] = useState(false)
  const { setTheme } = useTheme()

  const form = useForm<PreferencesFormValues>({
    resolver: zodResolver(preferencesFormSchema),
    defaultValues: {
      language: profile.language,
      theme: profile.theme,
    },
  })

  const { watch } = form
  const watchedValues = watch()

  // Check for changes
  useEffect(() => {
    const languageChanged = watchedValues.language !== profile.language
    const themeChanged = watchedValues.theme !== profile.theme

    setHasChanges(languageChanged || themeChanged)
  }, [watchedValues, profile])

  const onSubmit = (values: PreferencesFormValues) => {
    onPreferencesUpdate(values.language, values.theme)

    // Update the theme in next-themes
    setTheme(values.theme)

    toast.success('Preferences updated successfully')
    setHasChanges(false)
  }

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Português' },
  ]

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Display Preferences
          </CardTitle>
          <CardDescription>Customize your dashboard appearance and language</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Language Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <FormLabel className="text-base">Language</FormLabel>
                </div>

                <FormField
                  control={form.control}
                  name="language"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<PreferencesFormValues, 'language'>
                  }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languageOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="text-sm text-muted-foreground">
                  Choose your preferred language for the dashboard interface
                </p>
              </div>

              <Separator />

              {/* Theme Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <FormLabel className="text-base">Theme</FormLabel>
                </div>

                <FormField
                  control={form.control}
                  name="theme"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<PreferencesFormValues, 'theme'>
                  }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a theme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {themeOptions.map((option) => {
                            const IconComponent = option.icon
                            return (
                              <SelectItem key={option.value} value={option.value}>
                                <div className="flex items-center gap-2">
                                  <IconComponent className="h-4 w-4" />
                                  <span>{option.label}</span>
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="text-sm text-muted-foreground">
                  Choose between light and dark theme for the dashboard
                </p>
              </div>

              <Separator />

              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={!hasChanges || !form.formState.isValid}>
                  Save Preferences
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your preferences affect the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Sample Dashboard Text</h4>
              <p className="text-sm text-muted-foreground">
                This is how your dashboard will look with the selected theme and language settings.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Current Language:</span>
                <div className="flex items-center gap-1 mt-1">
                  <Globe className="h-3 w-3" />
                  {languageOptions.find((opt) => opt.value === watchedValues.language)?.label}
                </div>
              </div>
              <div>
                <span className="font-medium">Current Theme:</span>
                <div className="flex items-center gap-1 mt-1">
                  {watchedValues.theme === 'light' ? (
                    <Sun className="h-3 w-3" />
                  ) : (
                    <Moon className="h-3 w-3" />
                  )}
                  {themeOptions.find((opt) => opt.value === watchedValues.theme)?.label}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
