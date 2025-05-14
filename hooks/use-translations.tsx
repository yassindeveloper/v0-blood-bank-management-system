"use client"

import { useLanguage } from "./use-language"
import { translations } from "@/lib/translations"

export function useTranslations() {
  const { language } = useLanguage()
  return translations[language]
}
