"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  expanded?: boolean
  onToggle?: () => void
  companyName?: string
  userName?: string
  userEmail?: string
  userAvatar?: string
}

export function Sidebar({ 
  expanded = true, 
  onToggle, 
  className, 
  children,
  companyName = "Acme Inc.",
  userName = "shadcn",
  userEmail = "m@example.com",
  userAvatar,
  ...props 
}: SidebarProps) {
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
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {expanded && <span className="font-semibold">{companyName}</span>}
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

        {/* Main Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-6">
          {children}
        </nav>

        {/* User Section */}
        <div className="p-2 border-t">
          {expanded ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} />
                  <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar} />
                <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}

export function SidebarCategory({ 
  title, 
  expanded = true, 
  children 
}: {
  title: string
  expanded?: boolean
  children: React.ReactNode
}) {
  if (!expanded) {
    return <>{children}</>
  }

  return (
    <div className="space-y-2">
      <h3 className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
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
      asChild
      {...props}
    >
      <Link href={href}>
        {icon}
        {expanded && <span className="ml-2">{label}</span>}
      </Link>
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
