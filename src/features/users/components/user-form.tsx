'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { CreateUserRequest, UpdateUserRequest, User, UserRole, UserStatus } from '../types'

const userFormSchema = z.object({
  name: z.string().min(1, 'nameRequired').max(100, 'nameTooLong'),
  email: z.string().email('invalidEmail'),
  role: z.enum(['admin', 'user'], { message: 'roleRequired' }),
  status: z.enum(['active', 'inactive']).optional(),
})

type UserFormData = z.infer<typeof userFormSchema>

interface UserFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateUserRequest | UpdateUserRequest) => void
  loading: boolean
  title: string
  description: string
  user?: User | null
}

export function UserForm({
  open,
  onOpenChange,
  onSubmit,
  loading,
  title,
  description,
  user,
}: UserFormProps) {
  const t = useTranslations('users')
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'user',
      status: user?.status || 'active',
    },
  })

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      })
    } else {
      form.reset({
        name: '',
        email: '',
        role: 'user',
        status: 'active',
      })
    }
  }, [user, form])

  const handleSubmit = (data: UserFormData) => {
    onSubmit({ ...data, status: data.status || 'active' })
  }

  const errorText = (message?: string) => message && t(`form.validation.${message}`)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('columns.name')}</Label>
            <Input
              id="name"
              {...form.register('name')}
              placeholder={t('form.namePlaceholder')}
              disabled={loading}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {errorText(form.formState.errors.name.message)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('columns.email')}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="off"
              spellCheck={false}
              {...form.register('email')}
              placeholder={t('form.emailPlaceholder')}
              disabled={loading}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {errorText(form.formState.errors.email.message)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">{t('columns.role')}</Label>
            <Select
              value={form.watch('role')}
              onValueChange={(value) => form.setValue('role', value as UserRole)}
              disabled={loading}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder={t('form.rolePlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">{t('roles.user')}</SelectItem>
                <SelectItem value="admin">{t('roles.admin')}</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.role && (
              <p className="text-sm text-destructive">
                {errorText(form.formState.errors.role.message)}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">{t('columns.status')}</Label>
            <Select
              value={form.watch('status')}
              onValueChange={(value) => form.setValue('status', value as UserStatus)}
              disabled={loading}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder={t('form.statusPlaceholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">{t('statuses.active')}</SelectItem>
                <SelectItem value="inactive">{t('statuses.inactive')}</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.status && (
              <p className="text-sm text-destructive">
                {errorText(form.formState.errors.status.message)}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              {t('form.cancel')}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {user ? t('form.updating') : t('form.creating')}
                </>
              ) : user ? (
                t('form.update')
              ) : (
                t('form.create')
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
