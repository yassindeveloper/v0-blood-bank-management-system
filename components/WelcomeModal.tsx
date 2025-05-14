"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BloodDropIcon } from "@/components/icons/blood-drop"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

interface WelcomeSettings {
  titleAr: string
  titleEn: string
  messageAr: string
  messageEn: string
  enabled: boolean
  showOnce: boolean
}

export function WelcomeModal() {
  const { language } = useLanguage()
  const t = translations[language]
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<WelcomeSettings>({
    titleAr: t.welcomeTitle,
    titleEn: t.welcomeTitle,
    messageAr: t.welcomeMessage,
    messageEn: t.welcomeMessage,
    enabled: true,
    showOnce: true,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings")
        const data = await response.json()

        if (data.success && data.data.welcomeMessage) {
          setSettings(data.data.welcomeMessage)
        }
      } catch (error) {
        console.error("Error fetching welcome message settings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  useEffect(() => {
    if (loading) return

    // إذا كانت الرسالة غير مفعلة، لا تعرضها
    if (!settings.enabled) return

    // تحقق مما إذا كان المستخدم قد رأى الرسالة الترحيبية من قبل
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome")

    // إذا كان الإعداد هو عرض الرسالة مرة واحدة فقط وقد رآها المستخدم بالفعل، لا تعرضها
    if (settings.showOnce && hasSeenWelcome) return

    // إذا لم يكن قد رأى الرسالة، اعرضها
    setIsOpen(true)
  }, [loading, settings])

  const handleClose = () => {
    // تخزين أن المستخدم قد رأى الرسالة إذا كان الإعداد هو عرض الرسالة مرة واحدة فقط
    if (settings.showOnce) {
      localStorage.setItem("hasSeenWelcome", "true")
    }
    setIsOpen(false)
  }

  if (!isOpen) return null

  // اختيار العنوان والمحتوى حسب اللغة الحالية
  const title = language === "ar" ? settings.titleAr : settings.titleEn
  const message = language === "ar" ? settings.messageAr : settings.messageEn

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="relative">
          <div className="absolute top-2 right-2">
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
              <X className="h-4 w-4" />
              <span className="sr-only">{t.closeWelcome}</span>
            </Button>
          </div>
          <div className="flex justify-center mb-4">
            <BloodDropIcon className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 dark:text-gray-300">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleClose} className="bg-red-600 hover:bg-red-700">
            {t.getStarted}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
