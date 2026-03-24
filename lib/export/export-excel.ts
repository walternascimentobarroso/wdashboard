import * as XLSX from 'xlsx';
import { User } from '@/features/users/types';

export interface ExportData {
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export function exportUsersToExcel(users: User[], filename?: string): void {
  if (users.length === 0) {
    throw new Error('No users to export');
  }

  // Transform user data for export
  const exportData: ExportData[] = users.map(user => ({
    name: user.name,
    email: user.email,
    role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
    status: user.status.charAt(0).toUpperCase() + user.status.slice(1),
    createdAt: new Date(user.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(exportData, {
    header: ['name', 'email', 'role', 'status', 'createdAt']
  });

  // Set column widths
  const colWidths = [
    { wch: 20 }, // name
    { wch: 30 }, // email
    { wch: 15 }, // role
    { wch: 15 }, // status
    { wch: 15 }  // createdAt
  ];
  ws['!cols'] = colWidths;

  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Users');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const finalFilename = filename || `users-${timestamp}.xlsx`;

  // Download file
  XLSX.writeFile(wb, finalFilename);
}
