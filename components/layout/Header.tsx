"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme/ThemeToggle"

interface HeaderProps {
  onSidebarToggle?: () => void
  title?: string
}

export function Header({ onSidebarToggle, title = "Dashboard" }: HeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    router.push('/login')
  }

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
        <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
          User
        </span>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}
