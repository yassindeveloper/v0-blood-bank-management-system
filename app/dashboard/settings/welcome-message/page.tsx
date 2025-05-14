"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { Loader2 } from "lucide-react"

export default function WelcomeMessageSettings() {
  const { language } = useLanguage()
  const t = translations[language]
  const { toast } = useToast()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState({
    welcomeMessage: {
      titleAr: "",
      titleEn: "",
      messageAr: "",
      messageEn: "",
      enabled: true,
      showOnce: true,
    },
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/settings")
      const data = await response.json()

      if (data.success) {
        setSettings(data.data)
      } else {
        toast({
          title: "خطأ",
          description: data.error || "حدث خطأ أثناء جلب الإعدادات",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب الإعدادات",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({
      ...prev,
      welcomeMessage: {
        ...prev.welcomeMessage,
        [name]: value,
      },
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      welcomeMessage: {
        ...prev.welcomeMessage,
        [name]: checked,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)
      const response = await fetch("/api/settings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          welcomeMessage: settings.welcomeMessage,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "تم الحفظ",
          description: "تم حفظ إعدادات الرسالة الترحيبية بنجاح",
        })
        // تحديث localStorage لإظهار الرسالة الترحيبية مرة أخرى للاختبار
        localStorage.removeItem("hasSeenWelcome")
      } else {
        toast({
          title: "خطأ",
          description: data.error || "حدث خطأ أثناء حفظ الإعدادات",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حفظ الإعدادات",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handlePreview = () => {
    // حذف العلامة من localStorage لإظهار الرسالة الترحيبية مرة أخرى
    localStorage.removeItem("hasSeenWelcome")
    // الانتقال إلى الصفحة الرئيسية لرؤية الرسالة الترحيبية
    router.push("/")
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.welcomeMessageSettings}</h1>
        <Button onClick={handlePreview} variant="outline">
          {t.previewWelcomeMessage}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.customizeWelcomeMessage}</CardTitle>
          <CardDescription>{t.customizeWelcomeMessageDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enabled">{t.enableWelcomeMessage}</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.enableWelcomeMessageDescription}</p>
                </div>
                <Switch
                  id="enabled"
                  checked={settings.welcomeMessage.enabled}
                  onCheckedChange={(checked) => handleSwitchChange("enabled", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showOnce">{t.showWelcomeOnce}</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.showWelcomeOnceDescription}</p>
                </div>
                <Switch
                  id="showOnce"
                  checked={settings.welcomeMessage.showOnce}
                  onCheckedChange={(checked) => handleSwitchChange("showOnce", checked)}
                />
              </div>
            </div>

            <Tabs defaultValue="arabic" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="arabic">العربية</TabsTrigger>
                <TabsTrigger value="english">English</TabsTrigger>
              </TabsList>
              <TabsContent value="arabic" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="titleAr">{t.welcomeTitle} (العربية)</Label>
                  <Input
                    id="titleAr"
                    name="titleAr"
                    value={settings.welcomeMessage.titleAr}
                    onChange={handleChange}
                    placeholder="أدخل عنوان الرسالة الترحيبية بالعربية"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="messageAr">{t.welcomeMessage} (العربية)</Label>
                  <Textarea
                    id="messageAr"
                    name="messageAr"
                    value={settings.welcomeMessage.messageAr}
                    onChange={handleChange}
                    placeholder="أدخل محتوى الرسالة الترحيبية بالعربية"
                    rows={5}
                  />
                </div>
              </TabsContent>
              <TabsContent value="english" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="titleEn">{t.welcomeTitle} (English)</Label>
                  <Input
                    id="titleEn"
                    name="titleEn"
                    value={settings.welcomeMessage.titleEn}
                    onChange={handleChange}
                    placeholder="Enter welcome message title in English"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="messageEn">{t.welcomeMessage} (English)</Label>
                  <Textarea
                    id="messageEn"
                    name="messageEn"
                    value={settings.welcomeMessage.messageEn}
                    onChange={handleChange}
                    placeholder="Enter welcome message content in English"
                    rows={5}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end">
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.saving}
                  </>
                ) : (
                  t.saveSettings
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
