"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/hooks/use-translations"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { useSocketNotifications } from "@/hooks/use-socket"

interface Notification {
  _id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  date: string
  read: boolean
}

export default function NotificationsDropdown() {
  const t = useTranslations()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const { notification: socketNotification } = useSocketNotifications()

  useEffect(() => {
    fetchNotifications()
  }, [])

  useEffect(() => {
    if (socketNotification) {
      setNotifications((prev) => [socketNotification, ...prev])
      if (!socketNotification.read) {
        setUnreadCount((prev) => prev + 1)
      }
    }
  }, [socketNotification])

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications")
      const data = await response.json()

      if (data.success) {
        setNotifications(data.data)
        const unread = data.data.filter((n: Notification) => !n.read).length
        setUnreadCount(unread)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: "PATCH",
      })

      if (response.ok) {
        setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, read: true } : n)))
        setUnreadCount((prev) => Math.max(0, prev - 1))
      }
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM، HH:mm", { locale: ar })
    } catch {
      return dateString
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 min-w-[18px] h-[18px] flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <div className="p-2 font-medium border-b">{t.notifications}</div>
        <DropdownMenuGroup>
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">{t.noNotifications}</div>
          ) : (
            <div className="max-h-[60vh] overflow-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification._id}
                  className={`flex flex-col items-start p-3 border-b cursor-pointer ${!notification.read ? "bg-gray-50" : ""}`}
                  onClick={() => markAsRead(notification._id)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(notification.type)}`}>
                      {notification.title}
                    </span>
                    <span className="text-xs text-gray-500">{formatDate(notification.date)}</span>
                  </div>
                  <p className="mt-1 text-sm">{notification.message}</p>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </DropdownMenuGroup>
        {notifications.length > 0 && (
          <div className="p-2 text-center border-t">
            <Button variant="link" size="sm" className="text-xs text-gray-500" onClick={fetchNotifications}>
              {t.refreshNotifications}
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
