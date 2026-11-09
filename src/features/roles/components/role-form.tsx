'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Shield } from 'lucide-react'
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
import type { CreateRoleRequest, Role, RoleStatus } from '../types'

interface RoleFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: CreateRoleRequest) => void
  loading: boolean
  title: string
  description: string
  role?: Role | null
}

const emptyRole: CreateRoleRequest = { name: '', description: '', status: 'active' }

export function RoleForm({
  open,
  onOpenChange,
  onSubmit,
  loading,
  title,
  description,
  role,
}: RoleFormProps) {
  const t = useTranslations('roles')

  const schema = z.object({
    name: z.string().trim().min(1, t('form.nameRequired')).max(50, t('form.nameTooLong')),
    description: z.string().max(200, t('form.descriptionTooLong')),
    status: z.enum(['active', 'inactive']),
  })

  const form = useForm<CreateRoleRequest>({
    resolver: zodResolver(schema),
    defaultValues: emptyRole,
  })

  useEffect(() => {
    form.reset(
      role ? { name: role.name, description: role.description, status: role.status } : emptyRole
    )
  }, [role, form])

  const { errors } = form.formState

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex-row items-center gap-3 space-y-0">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary-soft text-link">
            <Shield className="h-5 w-5" />
          </span>
          <div className="space-y-1 text-left">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role-name">{t('columns.name')}</Label>
            <Input id="role-name" {...form.register('name')} disabled={loading} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role-description">{t('columns.description')}</Label>
            <Input id="role-description" {...form.register('description')} disabled={loading} />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role-status">{t('columns.status')}</Label>
            <Select
              value={form.watch('status')}
              onValueChange={(value) => form.setValue('status', value as RoleStatus)}
              disabled={loading}
            >
              <SelectTrigger id="role-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">{t('statuses.active')}</SelectItem>
                <SelectItem value="inactive">{t('statuses.inactive')}</SelectItem>
              </SelectContent>
            </Select>
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
              {t('form.save')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
