import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'
import { Providers } from './providers'
import { getMessages } from '@/lib/getMessages'
import { cookies, headers } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

async function getLocaleFromServer(): Promise<string> {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('locale')

  if (localeCookie && ['en', 'pt'].includes(localeCookie.value)) {
    return localeCookie.value
  }

  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')

  if (acceptLanguage) {
    const lang = acceptLanguage.split(',')[0].split('-')[0]
    if (lang === 'pt') return 'pt'
  }

  return 'en'
}

export const metadata: Metadata = {
  title: 'WDashboard',
  description: 'A dashboard template built with Next.js and shadcn/ui',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocaleFromServer()
  const messages = await getMessages(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers locale={locale} messages={messages}>
            {children}
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
