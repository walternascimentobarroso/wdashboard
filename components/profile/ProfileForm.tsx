'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ProfileAvatarUpload } from './ProfileAvatarUpload'
import { toast } from 'sonner'
import { ControllerRenderProps } from 'react-hook-form'
import type { UserProfile } from '@/types'

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

interface ProfileFormProps {
  profile: UserProfile
  onProfileUpdate: (updates: Partial<UserProfile>) => void
}

export function ProfileForm({ profile, onProfileUpdate }: ProfileFormProps) {
  const [hasChanges, setHasChanges] = useState(false)
  const [avatar, setAvatar] = useState(profile.avatar || '')

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
    },
  })

  const { watch } = form
  const watchedValues = watch()

  // Check for changes
  useEffect(() => {
    const nameChanged = watchedValues.name !== profile.name
    const emailChanged = watchedValues.email !== profile.email
    const avatarChanged = avatar !== profile.avatar

    setHasChanges(nameChanged || emailChanged || avatarChanged)
  }, [watchedValues, profile, avatar])

  const onSubmit = (values: ProfileFormValues) => {
    const updates: Partial<UserProfile> = {
      name: values.name,
      email: values.email,
      avatar,
    }

    onProfileUpdate(updates)
    toast.success('Profile updated successfully')
    setHasChanges(false)
  }

  const handleAvatarChange = (newAvatar: string) => {
    setAvatar(newAvatar)
  }

  const getRoleBadgeVariant = (role: string) => {
    return role === 'admin' ? 'default' : 'secondary'
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information and profile picture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Avatar Upload */}
            <div className="flex-shrink-0">
              <ProfileAvatarUpload
                currentAvatar={profile.avatar}
                name={profile.name}
                onAvatarChange={handleAvatarChange}
              />
            </div>

            {/* Form */}
            <div className="flex-1">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({
                      field,
                    }: {
                      field: ControllerRenderProps<ProfileFormValues, 'name'>
                    }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({
                      field,
                    }: {
                      field: ControllerRenderProps<ProfileFormValues, 'email'>
                    }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            {...field}
                            disabled
                            className="bg-muted"
                          />
                        </FormControl>
                        <FormMessage />
                        <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                      </FormItem>
                    )}
                  />

                  <Separator />

                  <div className="space-y-2">
                    <FormLabel>Role</FormLabel>
                    <Badge variant={getRoleBadgeVariant(profile.role)}>{profile.role}</Badge>
                    <p className="text-xs text-muted-foreground">
                      Your role is managed by the system administrator
                    </p>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={!hasChanges || !form.formState.isValid}>
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
