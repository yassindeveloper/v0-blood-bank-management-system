"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BloodDropIcon } from "@/components/icons/blood-drop"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export default function LoginPage() {
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate and authenticate here
    console.log("Login attempt:", formData)

    // For demo purposes, we'll just redirect to the dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <BloodDropIcon className="h-12 w-12 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-center">{t.login}</CardTitle>
          <CardDescription className="text-center">{t.loginDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t.username}</Label>
              <Input
                id="username"
                name="username"
                placeholder={t.usernamePlaceholder}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t.passwordPlaceholder}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              {t.loginButton}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500"
          >
            {t.backToHome}
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
