import type { Role } from '../types'

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full access to every module',
    status: 'active',
    createdAt: '2024-01-10T09:00:00.000Z',
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can create and edit content',
    status: 'active',
    createdAt: '2024-01-12T11:30:00.000Z',
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access',
    status: 'active',
    createdAt: '2024-02-01T15:00:00.000Z',
  },
  {
    id: '4',
    name: 'Auditor',
    description: 'Access to logs and reports',
    status: 'inactive',
    createdAt: '2024-03-05T08:45:00.000Z',
  },
]
