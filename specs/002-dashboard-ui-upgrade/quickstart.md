# Quickstart Guide: Dashboard UI Upgrade

**Purpose**: Quick start guide for implementing the Dashboard UI Upgrade
**Date**: 2026-03-23
**Feature**: 002-dashboard-ui-upgrade

## Prerequisites

### Required Dependencies
```bash
# Ensure these are installed
npm install tailwindcss@latest
npm install @radix-ui/react-icons
npm install class-variance-authority clsx tailwind-merge
```

### shadcn/ui Setup
```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init

# Add required components
npx shadcn-ui@latest add button card input dialog sheet
npx shadcn-ui@latest add scroll-area separator avatar dropdown-menu
npx shadcn-ui@latest add skeleton badge tooltip
```

## Phase 1: Setup UI Base

### 1.1 Update Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

### 1.2 Update Global CSS
```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Glass effect utilities */
@layer utilities {
  .glass-light {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .glass-dark {
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .glass {
    @apply glass-light dark:glass-dark;
  }
}
```

## Phase 2: Create Layout Components

### 2.1 Theme Provider
```typescript
// components/theme/ThemeProvider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### 2.2 Theme Toggle
```typescript
// components/theme/ThemeToggle.tsx
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### 2.3 Sidebar Component
```typescript
// components/layout/Sidebar.tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded?: boolean
  onToggle?: () => void
}

export function Sidebar({ expanded = true, onToggle, className, children, ...props }: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "flex flex-col h-full bg-background border-r transition-all duration-300",
          expanded ? "w-64" : "w-16",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between p-4">
          {expanded && <span className="font-semibold">Dashboard</span>}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="h-8 w-8"
              >
                {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{expanded ? "Collapse sidebar" : "Expand sidebar"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          {children}
        </nav>
      </div>
    </TooltipProvider>
  )
}

export function SidebarItem({ 
  icon, 
  label, 
  href, 
  expanded = true, 
  active = false,
  ...props 
}: {
  icon: React.ReactNode
  label: string
  href: string
  expanded?: boolean
  active?: boolean
}) {
  const content = (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        !expanded && "px-2"
      )}
      {...props}
    >
      {icon}
      {expanded && <span className="ml-2">{label}</span>}
    </Button>
  )

  if (!expanded) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
```

### 2.4 Header Component
```typescript
// components/layout/Header.tsx
import * as React from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/ThemeToggle"

interface HeaderProps {
  onSidebarToggle?: () => void
  title?: string
}

export function Header({ onSidebarToggle, title = "Dashboard" }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-16 px-4 border-b bg-background">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
      </div>
    </header>
  )
}
```

### 2.5 Dashboard Layout
```typescript
// components/layout/DashboardLayout.tsx
"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Header } from "./Header"
import { Sidebar } from "./Sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Load saved preferences
  useEffect(() => {
    const saved = localStorage.getItem('dashboard-preferences')
    if (saved) {
      try {
        const prefs = JSON.parse(saved)
        setSidebarExpanded(prefs.sidebarExpanded ?? true)
      } catch (e) {
        console.error('Failed to load preferences:', e)
      }
    }
  }, [])

  // Save preferences
  useEffect(() => {
    const prefs = { sidebarExpanded }
    localStorage.setItem('dashboard-preferences', JSON.stringify(prefs))
  }, [sidebarExpanded])

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setMobileOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleSidebarToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen)
    } else {
      setSidebarExpanded(!sidebarExpanded)
    }
  }

  if (isMobile) {
    return (
      <div className={cn("min-h-screen bg-background", className)}>
        <Header onSidebarToggle={handleSidebarToggle} />
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar expanded={true} onToggle={() => setMobileOpen(false)}>
              {/* Navigation items will go here */}
            </Sidebar>
          </SheetContent>
        </Sheet>
        <main className="p-4">
          {children}
        </main>
      </div>
    )
  }

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <div className="flex h-screen">
        <Sidebar expanded={sidebarExpanded} onToggle={handleSidebarToggle}>
          {/* Navigation items will go here */}
        </Sidebar>
        <div className="flex-1 flex flex-col">
          <Header onSidebarToggle={handleSidebarToggle} />
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
```

## Phase 3: Update Root Layout

### 3.1 Update App Layout
```typescript
// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/ThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Modern dashboard with shadcn/ui",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### 3.2 Update Dashboard Page
```typescript
// app/dashboard/page.tsx
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Sidebar, SidebarItem } from "@/components/layout/Sidebar"
import { Home, BarChart3, FileText, Settings } from "lucide-react"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Sidebar>
        <SidebarItem
          icon={<Home className="h-4 w-4" />}
          label="Dashboard"
          href="/dashboard"
          active={true}
        />
        <SidebarItem
          icon={<BarChart3 className="h-4 w-4" />}
          label="Analytics"
          href="/dashboard/analytics"
        />
        <SidebarItem
          icon={<FileText className="h-4 w-4" />}
          label="Documents"
          href="/dashboard/files"
        />
        <SidebarItem
          icon={<Settings className="h-4 w-4" />}
          label="Settings"
          href="/dashboard/settings"
        />
      </Sidebar>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p>Welcome to your upgraded dashboard!</p>
        
        {/* Example card with glass effect */}
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-semibold">Glass Effect Card</h3>
          <p>This card uses the glass effect utility class.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
```

## Phase 4: Add Glass Effects

### 4.1 Glass Card Variant
```typescript
// components/ui/card.tsx (extend existing)
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    glass?: boolean
  }
>(({ className, glass, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      glass && "glass",
      className
    )}
    {...props}
  )
))
Card.displayName = "Card"

export { Card }
```

## Testing the Implementation

### 5.1 Development Server
```bash
npm run dev
```

### 5.2 Test Features
1. **Theme Toggle**: Click the theme toggle in the header
2. **Sidebar Toggle**: Click the sidebar toggle button
3. **Responsive**: Resize browser to see mobile behavior
4. **Glass Effects**: View the glass card in both themes

## Next Steps

1. **Add Navigation Items**: Populate sidebar with actual navigation
2. **Migrate Components**: Replace existing UI with shadcn components
3. **Add Glass Effects**: Apply glass variants to cards and dialogs
4. **Test Responsiveness**: Ensure mobile drawer works correctly
5. **Performance Testing**: Verify performance requirements are met

## Troubleshooting

### Common Issues
- **Theme not persisting**: Check localStorage availability
- **Sidebar state not saving**: Verify localStorage writes
- **Glass effects not visible**: Ensure backdrop-filter is supported
- **Mobile drawer not working**: Check responsive breakpoints

### Debug Tips
- Use browser dev tools to inspect localStorage
- Test with different screen sizes
- Verify CSS variables are applied correctly
- Check console for JavaScript errors

## Performance Optimization

### Tips
- Use React.memo for expensive components
- Debounce resize events
- Lazy load heavy components
- Optimize glass effect rendering

### Monitoring
- Monitor sidebar toggle performance
- Track theme switching speed
- Measure page load impact
- Test memory usage
