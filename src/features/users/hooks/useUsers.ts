import { useCrudList } from '@/hooks/useCrudList'
import { usersService } from '../services/storage'
import type { User, UserFilters } from '../types'

const initialFilters: UserFilters = { search: '' }

function matchesFilters(user: User, { search, role, status }: UserFilters): boolean {
  const query = search.toLowerCase()
  return (
    (!query ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)) &&
    (!role || user.role === role) &&
    (!status || user.status === status)
  )
}

export function useUsers() {
  return useCrudList(usersService, {
    initialFilters,
    matches: matchesFilters,
    defaultSort: 'createdAt',
  })
}
