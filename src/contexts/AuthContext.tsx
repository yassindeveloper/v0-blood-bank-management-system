"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface User {
  id: string
  username: string
  role: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => false,
  logout: async () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const loadUser = async () => {
      try {
        const userString = await AsyncStorage.getItem("user")
        if (userString) {
          setUser(JSON.parse(userString))
        }
      } catch (error) {
        console.error("Failed to load user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (username: string, password: string) => {
    // In a real app, you would validate credentials with your API
    // For demo purposes, we'll just check if username and password are not empty
    if (username && password) {
      try {
        // Mock user data - in a real app, this would come from your API
        const userData: User = {
          id: "1",
          username,
          role: "admin",
        }

        await AsyncStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        return true
      } catch (error) {
        console.error("Login failed:", error)
        return false
      }
    }
    return false
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user")
      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
