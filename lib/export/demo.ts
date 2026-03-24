// Demo script to test export functionality
// This can be run in the browser console to test exports

import { exportUsersToExcel, exportUsersToPDF } from './index';
import { User } from '@/features/users/types';

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
];

// Test functions
export function testExcelExport() {
  try {
    console.log('Testing Excel export...');
    exportUsersToExcel(sampleUsers, 'test-users.xlsx');
    console.log('Excel export successful!');
  } catch (error) {
    console.error('Excel export failed:', error);
  }
}

export function testPDFExport() {
  try {
    console.log('Testing PDF export...');
    exportUsersToPDF(sampleUsers, 'test-users.pdf');
    console.log('PDF export successful!');
  } catch (error) {
    console.error('PDF export failed:', error);
  }
}

// Make available globally for testing
if (typeof window !== 'undefined') {
  (window as any).testExports = {
    testExcelExport,
    testPDFExport,
    sampleUsers,
  };
}
