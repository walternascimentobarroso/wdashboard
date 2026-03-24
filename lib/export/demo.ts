// Demo script to test export functionality
// This can be run in the browser console to test exports

import { exportUsersToExcel, exportUsersToPDF } from './index'
import { User } from '@/features/users/types'

// Sample data for testing
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'inactive',
    createdAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    status: 'active',
    createdAt: '2024-02-01T09:15:00Z',
  },
]

// Test functions
export function testExcelExport() {
  try {
    exportUsersToExcel(sampleUsers, 'test-users.xlsx')
  } catch {
    // Excel export failed
  }
}

export function testPDFExport() {
  try {
    exportUsersToPDF(sampleUsers, 'test-users.pdf')
  } catch {
    // PDF export failed
  }
}

// Make available globally for testing
if (typeof window !== 'undefined') {
  interface TestExports {
    testExcelExport: () => void
    testPDFExport: () => void
    sampleUsers: User[]
  }

  ;(window as Window & { testExports?: TestExports }).testExports = {
    testExcelExport,
    testPDFExport,
    sampleUsers,
  }
}
