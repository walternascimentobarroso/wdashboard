import { useCrudList } from '@/hooks/useCrudList'
import { rolesService } from '../services/storage'
import type { Role, RoleFilters } from '../types'

const initialFilters: RoleFilters = { search: '' }

function matchesFilters(role: Role, { search, status }: RoleFilters): boolean {
  const query = search.toLowerCase()
  return (
    (!query ||
      role.name.toLowerCase().includes(query) ||
      role.description.toLowerCase().includes(query)) &&
    (!status || role.status === status)
  )
}

export function useRoles() {
  return useCrudList(rolesService, {
    initialFilters,
    matches: matchesFilters,
    defaultSort: 'createdAt',
  })
}
