export interface ExportData {
  name: string
  email: string
  role: string
  status: string
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user'
  status: 'active' | 'inactive'
  createdAt: string
}

export function transformUserForExport(users: User[]): ExportData[] {
  return users.map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
    status: user.status.charAt(0).toUpperCase() + user.status.slice(1),
    createdAt: new Date(user.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
  }))
}
