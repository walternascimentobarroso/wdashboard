import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { User } from '@/features/users/types';

export interface ExportData {
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

export function exportUsersToPDF(users: User[], filename?: string): void {
  if (users.length === 0) {
    throw new Error('No users to export');
  }

  // Initialize PDF
  const doc = new jsPDF();

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

  // Add title
  doc.setFontSize(16);
  doc.text('Users Report', 14, 15);

  // Add timestamp
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 25);

  // Add table
  autoTable(doc, {
    head: [['Name', 'Email', 'Role', 'Status', 'Created At']],
    body: exportData.map(user => [
      user.name,
      user.email,
      user.role,
      user.status,
      user.createdAt
    ]),
    startY: 35,
    styles: {
      fontSize: 10,
      cellPadding: 3
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    columnStyles: {
      0: { cellWidth: 40 }, // Name
      1: { cellWidth: 60 }, // Email
      2: { cellWidth: 25 }, // Role
      3: { cellWidth: 25 }, // Status
      4: { cellWidth: 30 }  // Created At
    }
  });

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const finalFilename = filename || `users-${timestamp}.pdf`;

  // Save PDF
  doc.save(finalFilename);
}
