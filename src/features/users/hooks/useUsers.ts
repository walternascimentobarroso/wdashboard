import { type CrudService, useCrudList } from '@/hooks/useCrudList'
import { UsersStorage } from '../services/storage'
import type { CreateUserRequest, UpdateUserRequest, User, UserFilters } from '../types'

const storage = new UsersStorage()

const usersService: CrudService<User, CreateUserRequest, UpdateUserRequest> = {
  getAll: () => storage.getUsers(),
  create: (data) => storage.createUser(data),
  update: (id, data) => storage.updateUser(id, data),
  remove: (id) => storage.deleteUser(id),
}

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
