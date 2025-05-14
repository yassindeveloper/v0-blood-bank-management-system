"use client"

import { useEffect, useState } from "react"
import io, { type Socket } from "socket.io-client"
import { useAuth } from "@/hooks/use-auth"

let socket: Socket | null = null

export function useSocketInit() {
  const { user } = useAuth()

  useEffect(() => {
    const initSocket = async () => {
      await fetch("/api/socket")

      if (!socket) {
        socket = io({
          path: "/api/socket",
        })

        socket.on("connect", () => {
          console.log("Socket connected")
        })

        socket.on("disconnect", () => {
          console.log("Socket disconnected")
        })
      }

      if (user && user.id && socket) {
        socket.emit("join-user", user.id)
      }
    }

    initSocket()

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [user])

  return null
}

export function useSocketNotifications() {
  const [notification, setNotification] = useState<any>(null)

  useEffect(() => {
    if (!socket) return

    const onNotification = (data: any) => {
      setNotification(data)
    }

    socket.on("notification", onNotification)

    return () => {
      socket.off("notification", onNotification)
    }
  }, [socket])

  return { notification }
}
