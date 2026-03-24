'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Activity, User, Settings, Shield, FileText, Trash2, LogIn, Clock } from 'lucide-react'
import type { ActivityLog } from '@/types'

interface ActivityListProps {
  activities: ActivityLog[]
  isLoading?: boolean
}

export function ActivityList({ activities, isLoading }: ActivityListProps) {
  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'login':
        return <LogIn className="h-4 w-4 text-green-500" />
      case 'profile_update':
        return <User className="h-4 w-4 text-blue-500" />
      case 'user_action':
        return <Settings className="h-4 w-4 text-orange-500" />
      case 'system':
        return <Shield className="h-4 w-4 text-purple-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getActivityBadgeVariant = (type: ActivityLog['type']) => {
    switch (type) {
      case 'login':
        return 'default'
      case 'profile_update':
        return 'secondary'
      case 'user_action':
        return 'outline'
      case 'system':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInMinutes < 1) {
      return 'Just now'
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  const getActionIcon = (action: string) => {
    if (action.includes('delete') || action.includes('remove')) {
      return <Trash2 className="h-3 w-3 text-red-500" />
    }
    if (action.includes('update') || action.includes('edit')) {
      return <FileText className="h-3 w-3 text-blue-500" />
    }
    if (action.includes('login')) {
      return <LogIn className="h-3 w-3 text-green-500" />
    }
    return <Clock className="h-3 w-3 text-gray-500" />
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your recent account activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-24 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Your recent account activity and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {activities.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity</p>
                <p className="text-sm">Your activity will appear here as you use the dashboard</p>
              </div>
            ) : (
              activities.map((activity, index) => (
                <div key={activity.id}>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {getActivityIcon(activity.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1">
                          {getActionIcon(activity.action)}
                          <p className="text-sm font-medium">
                            {activity.action.replace('_', ' ').charAt(0).toUpperCase() +
                              activity.action.replace('_', ' ').slice(1)}
                          </p>
                        </div>
                        <Badge variant={getActivityBadgeVariant(activity.type)} className="text-xs">
                          {activity.type.replace('_', ' ')}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>

                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </div>

                  {index < activities.length - 1 && <Separator className="mt-4" />}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Activity Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {activities.filter((a) => a.type === 'login').length}
              </div>
              <div className="text-xs text-muted-foreground">Logins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {activities.filter((a) => a.type === 'profile_update').length}
              </div>
              <div className="text-xs text-muted-foreground">Updates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">
                {activities.filter((a) => a.type === 'user_action').length}
              </div>
              <div className="text-xs text-muted-foreground">Actions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">
                {activities.filter((a) => a.type === 'system').length}
              </div>
              <div className="text-xs text-muted-foreground">System</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
