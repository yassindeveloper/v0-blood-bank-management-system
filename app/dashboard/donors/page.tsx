"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DonorTable } from "@/components/dashboard/donor-table"
import { AddDonorDialog } from "@/components/dashboard/add-donor-dialog"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export default function DonorsPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDonorOpen, setIsAddDonorOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.donors}</h1>
        <Button onClick={() => setIsAddDonorOpen(true)} className="bg-red-600 hover:bg-red-700">
          {t.addNewDonor}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.donorsList}</CardTitle>
          <div className="flex mt-4">
            <Input
              placeholder={t.searchDonors}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <DonorTable searchQuery={searchQuery} />
        </CardContent>
      </Card>

      <AddDonorDialog open={isAddDonorOpen} onOpenChange={setIsAddDonorOpen} />
    </div>
  )
}
