import { createLocalCrud, crudError } from '@/lib/local-crud'
import { mockUsers } from '../data/mock'
import type { CreateUserRequest, UpdateUserRequest, User, UserErrorCode } from '../types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function fail(code: UserErrorCode, message: string): never {
  throw crudError(code, message)
}

function validateUser(users: User[], candidate: User, id?: string) {
  const name = candidate.name.trim()
  if (name.length < 1 || name.length > 100)
    fail('VALIDATION_ERROR', 'Name must be between 1 and 100 characters')
  if (!EMAIL_PATTERN.test(candidate.email)) fail('VALIDATION_ERROR', 'Invalid email format')
  if (users.some((u) => u.id !== id && u.email.toLowerCase() === candidate.email))
    fail('DUPLICATE_EMAIL', 'Email address already exists')

  const current = users.find((u) => u.id === id)
  if (current?.role !== 'admin') return
  const others = users.filter((u) => u.role === 'admin' && u.id !== id)
  if (candidate.role !== 'admin' && others.length === 0)
    fail('LAST_ADMIN_DEMOTION', 'Cannot demote the last administrator')
  if (
    current.status === 'active' &&
    candidate.status === 'inactive' &&
    !others.some((u) => u.status === 'active')
  )
    fail('LAST_ADMIN_DEACTIVATION', 'Cannot deactivate the last administrator')
}

function validateRemoveUser(users: User[], id: string) {
  const isAdmin = users.some((u) => u.id === id && u.role === 'admin')
  if (isAdmin && !users.some((u) => u.role === 'admin' && u.id !== id))
    fail('LAST_ADMIN_DELETION', 'Cannot delete the last administrator')
}

export const usersService = createLocalCrud<User, CreateUserRequest, UpdateUserRequest>({
  key: 'wdashboard-users',
  seed: mockUsers,
  build: (data) => ({
    name: data.name.trim(),
    email: data.email.toLowerCase().trim(),
    role: data.role,
    status: data.status ?? 'active',
  }),
  apply: (user, data) => ({
    ...user,
    ...data,
    name: (data.name ?? user.name).trim(),
    email: (data.email ?? user.email).toLowerCase().trim(),
  }),
  validate: validateUser,
  validateRemove: validateRemoveUser,
})
