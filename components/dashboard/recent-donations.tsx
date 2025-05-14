"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export function RecentDonations() {
  const { language } = useLanguage()
  const t = translations[language]

  // In a real app, this data would come from your API
  const recentDonations = [
    {
      id: 1,
      donor: "أحمد محمد",
      bloodType: "A+",
      date: "2023-05-15",
      quantity: "450ml",
    },
    {
      id: 2,
      donor: "سارة أحمد",
      bloodType: "O-",
      date: "2023-05-14",
      quantity: "450ml",
    },
    {
      id: 3,
      donor: "محمد علي",
      bloodType: "B+",
      date: "2023-05-13",
      quantity: "450ml",
    },
    {
      id: 4,
      donor: "فاطمة حسن",
      bloodType: "AB+",
      date: "2023-05-12",
      quantity: "450ml",
    },
  ]

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t.donorName}
              </th>
              <th scope="col" className="px-6 py-3">
                {t.bloodType}
              </th>
              <th scope="col" className="px-6 py-3">
                {t.lastDonation}
              </th>
              <th scope="col" className="px-6 py-3">
                {t.quantity}
              </th>
            </tr>
          </thead>
          <tbody>
            {recentDonations.map((donation) => (
              <tr key={donation.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {donation.donor}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    {donation.bloodType}
                  </span>
                </td>
                <td className="px-6 py-4">{donation.date}</td>
                <td className="px-6 py-4">{donation.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right">
        <Link href="/dashboard/donors">
          <Button variant="link" className="text-red-600 hover:text-red-700">
            {t.viewAll} →
          </Button>
        </Link>
      </div>
    </div>
  )
}
