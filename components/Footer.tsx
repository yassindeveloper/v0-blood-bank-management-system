"use client"

import Link from "next/link"
import { Facebook, Instagram, Globe, MessageCircle } from "lucide-react"
import { BloodDropIcon } from "@/components/icons/blood-drop"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <BloodDropIcon className="h-6 w-6 text-red-600" />
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              <span className="text-red-600">Blood</span>Bank
            </span>
          </div>

          <div className="flex flex-wrap gap-4 mb-4 md:mb-0 justify-center">
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">WhatsApp</span>
            </Link>
            <Link
              href="https://www.yti.rf.gd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors"
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Website</span>
            </Link>
          </div>

          <div className="text-gray-600 dark:text-gray-300 text-center md:text-right">
            <div>
              © {new Date().getFullYear()} {t.copyrightText}
            </div>
            <div className="text-sm mt-1">
              <Link
                href="https://www.yti.rf.gd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-600 dark:hover:text-red-500 transition-colors"
              >
                www.yti.rf.gd
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
