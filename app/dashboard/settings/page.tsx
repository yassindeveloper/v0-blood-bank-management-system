"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import Link from "next/link"
import { MessageSquare } from "lucide-react"

export default function SettingsPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const settingsOptions = [
    {
      title: t.welcomeMessageSettings,
      description: t.customizeWelcomeMessageDescription,
      icon: <MessageSquare className="h-8 w-8 text-red-600" />,
      href: "/dashboard/settings/welcome-message",
    },
    // يمكن إضافة المزيد من خيارات الإعدادات هنا
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.settings}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsOptions.map((option, index) => (
          <Link key={index} href={option.href} className="block">
            <Card className="h-full transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{option.title}</CardTitle>
                {option.icon}
              </CardHeader>
              <CardContent>
                <CardDescription>{option.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
