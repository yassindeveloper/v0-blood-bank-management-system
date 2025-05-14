"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import { useColorScheme } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

type ThemeMode = "light" | "dark" | "system"

interface ThemeContextType {
  theme: ThemeMode
  isDark: boolean
  setTheme: (theme: ThemeMode) => void
  colors: {
    background: string
    card: string
    text: string
    border: string
    primary: string
    secondary: string
    error: string
    success: string
    warning: string
    info: string
  }
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "system",
  isDark: false,
  setTheme: () => {},
  colors: {
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#000000",
    border: "#E5E5E5",
    primary: "#DC2626",
    secondary: "#4B5563",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
    info: "#3B82F6",
  },
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme()
  const [theme, setThemeState] = useState<ThemeMode>("system")

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("theme")
        if (savedTheme) {
          setThemeState(savedTheme as ThemeMode)
        }
      } catch (error) {
        console.error("Failed to load theme preference:", error)
      }
    }

    loadTheme()
  }, [])

  const setTheme = async (newTheme: ThemeMode) => {
    try {
      await AsyncStorage.setItem("theme", newTheme)
      setThemeState(newTheme)
    } catch (error) {
      console.error("Failed to save theme preference:", error)
    }
  }

  const isDark = theme === "system" ? systemColorScheme === "dark" : theme === "dark"

  const lightColors = {
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#000000",
    border: "#E5E5E5",
    primary: "#DC2626",
    secondary: "#4B5563",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B",
    info: "#3B82F6",
  }

  const darkColors = {
    background: "#1F2937",
    card: "#374151",
    text: "#FFFFFF",
    border: "#4B5563",
    primary: "#EF4444",
    secondary: "#9CA3AF",
    error: "#F87171",
    success: "#34D399",
    warning: "#FBBF24",
    info: "#60A5FA",
  }

  const colors = isDark ? darkColors : lightColors

  return <ThemeContext.Provider value={{ theme, isDark, setTheme, colors }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
