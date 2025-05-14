"use client"

import { createContext, useState, useContext, useEffect, type ReactNode } from "react"
import * as Localization from "expo-localization"
import { I18n } from "i18n-js"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ar } from "../translations/ar"
import { en } from "../translations/en"

type Language = "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType>({
  language: "ar",
  setLanguage: () => {},
  t: () => "",
  isRTL: true,
})

const i18n = new I18n({
  ar,
  en,
})

i18n.enableFallback = true
i18n.defaultLocale = "ar"

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("ar")

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("language")
        if (savedLanguage) {
          setLanguageState(savedLanguage as Language)
        } else {
          // Use device language as default, or fall back to Arabic
          const deviceLanguage = Localization.locale.split("-")[0]
          setLanguageState((deviceLanguage === "en" ? "en" : "ar") as Language)
        }
      } catch (error) {
        console.error("Failed to load language preference:", error)
      }
    }

    loadLanguage()
  }, [])

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem("language", lang)
      setLanguageState(lang)
    } catch (error) {
      console.error("Failed to save language preference:", error)
    }
  }

  i18n.locale = language

  const t = (key: string) => i18n.t(key)
  const isRTL = language === "ar"

  return <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)
