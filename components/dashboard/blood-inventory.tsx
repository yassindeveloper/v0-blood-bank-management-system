"use client"

import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export function BloodInventory() {
  const { language } = useLanguage()
  const t = translations[language]

  // In a real app, this data would come from your API
  const inventory = [
    { type: "A+", units: 45, status: "available" },
    { type: "A-", units: 12, status: "available" },
    { type: "B+", units: 30, status: "available" },
    { type: "B-", units: 8, status: "low" },
    { type: "AB+", units: 15, status: "available" },
    { type: "AB-", units: 5, status: "critical" },
    { type: "O+", units: 50, status: "available" },
    { type: "O-", units: 10, status: "low" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "low":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return t.available
      case "low":
        return t.low
      case "critical":
        return t.critical
      default:
        return status
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {inventory.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-2">
              <span className="text-red-600 font-bold">{item.type}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.units}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t.quantity}</p>
            <span className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
              {getStatusText(item.status)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
