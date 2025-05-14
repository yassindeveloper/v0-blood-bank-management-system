"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { BloodDropIcon } from "@/components/icons/blood-drop"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    router.push("/login")
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Link href="/dashboard" className="flex items-center gap-2">
          <BloodDropIcon className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            <span className="text-red-600">Blood</span>Bank
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {t.logout}
        </Button>
      </div>
    </header>
  )
}
