"use client"

import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export function InventoryTable() {
  const { language } = useLanguage()
  const t = translations[language]

  // In a real app, this data would come from your API
  const inventory = [
    { type: "A+", units: 45, lastUpdated: "2023-05-15", status: "available" },
    { type: "A-", units: 12, lastUpdated: "2023-05-14", status: "available" },
    { type: "B+", units: 30, lastUpdated: "2023-05-13", status: "available" },
    { type: "B-", units: 8, lastUpdated: "2023-05-12", status: "low" },
    { type: "AB+", units: 15, lastUpdated: "2023-05-11", status: "available" },
    { type: "AB-", units: 5, lastUpdated: "2023-05-10", status: "critical" },
    { type: "O+", units: 50, lastUpdated: "2023-05-09", status: "available" },
    { type: "O-", units: 10, lastUpdated: "2023-05-08", status: "low" },
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
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              {t.bloodGroup}
            </th>
            <th scope="col" className="px-6 py-3">
              {t.quantity}
            </th>
            <th scope="col" className="px-6 py-3">
              {t.lastUpdated}
            </th>
            <th scope="col" className="px-6 py-3">
              {t.status}
            </th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">{item.type}</span>
              </td>
              <td className="px-6 py-4">{item.units}</td>
              <td className="px-6 py-4">{item.lastUpdated}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
