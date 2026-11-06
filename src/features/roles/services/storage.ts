import { createLocalCrud, crudError } from '@/lib/local-crud'
import { mockRoles } from '../data/mock'
import type { CreateRoleRequest, Role, UpdateRoleRequest } from '../types'

export const rolesService = createLocalCrud<Role, CreateRoleRequest, UpdateRoleRequest>({
  key: 'wdashboard-roles',
  seed: mockRoles,
  build: (data) => ({ ...data, name: data.name.trim(), description: data.description.trim() }),
  apply: (role, data) => ({
    ...role,
    ...data,
    name: (data.name ?? role.name).trim(),
    description: (data.description ?? role.description).trim(),
  }),
  validate: (roles, candidate, id) => {
    if (!candidate.name) throw crudError('VALIDATION_ERROR', 'Name is required')
    const name = candidate.name.toLowerCase()
    if (roles.some((role) => role.id !== id && role.name.toLowerCase() === name)) {
      throw crudError('DUPLICATE_NAME', 'Role name already exists')
    }
  },
})
