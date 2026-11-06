export type RoleStatus = 'active' | 'inactive'

export interface Role {
  id: string
  name: string
  description: string
  status: RoleStatus
  createdAt: string
}

export interface CreateRoleRequest {
  name: string
  description: string
  status: RoleStatus
}

export type UpdateRoleRequest = Partial<CreateRoleRequest>

export interface RoleFilters {
  search: string
  status?: RoleStatus
}
