"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PatientTable } from "@/components/dashboard/patient-table"
import { AddPatientDialog } from "@/components/dashboard/add-patient-dialog"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"

export default function PatientsPage() {
  const { language } = useLanguage()
  const t = translations[language]

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.patients}</h1>
        <Button onClick={() => setIsAddPatientOpen(true)} className="bg-red-600 hover:bg-red-700">
          {t.addNewPatient}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.patientsList}</CardTitle>
          <div className="flex mt-4">
            <Input
              placeholder={t.searchPatients}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <PatientTable searchQuery={searchQuery} />
        </CardContent>
      </Card>

      <AddPatientDialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen} />
    </div>
  )
}
