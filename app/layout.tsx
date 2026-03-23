import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/modules/auth/components/AuthProvider'
import { ToastProvider } from '@/components/shared/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WDashboard',
  description: 'A dashboard template built with Next.js and shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
