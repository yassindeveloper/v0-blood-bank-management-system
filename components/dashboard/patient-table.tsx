"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { AddPatientDialog } from "./add-patient-dialog"

interface PatientTableProps {
  searchQuery: string
}

export function PatientTable({ searchQuery }: PatientTableProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const [isEditPatientOpen, setIsEditPatientOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [patientToDelete, setPatientToDelete] = useState<any>(null)

  // In a real app, this data would come from your API
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "خالد محمود",
      bloodType: "A+",
      hospital: "مستشفى المركزي",
      status: "active",
      phone: "0123456789",
      email: "khaled@example.com",
      address: "القاهرة، مصر",
      dateOfBirth: "1980-05-15",
    },
    {
      id: 2,
      name: "ليلى عبد الله",
      bloodType: "O-",
      hospital: "مستشفى الأمل",
      status: "critical",
      phone: "0123456788",
      email: "laila@example.com",
      address: "الإسكندرية، مصر",
      dateOfBirth: "1975-11-22",
    },
    {
      id: 3,
      name: "عمر سعيد",
      bloodType: "B+",
      hospital: "مستشفى الشفاء",
      status: "stable",
      phone: "0123456787",
      email: "omar@example.com",
      address: "الجيزة، مصر",
      dateOfBirth: "1990-03-10",
    },
  ])

  const handleEditPatient = (patient: any) => {
    setSelectedPatient(patient)
    setIsEditPatientOpen(true)
  }

  const handleDeletePatient = (patient: any) => {
    setPatientToDelete(patient)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeletePatient = () => {
    // In a real app, you would call your API to delete the patient
    setPatients(patients.filter((patient) => patient.id !== patientToDelete.id))
    setIsDeleteDialogOpen(false)
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.hospital.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "stable":
        return "bg-blue-100 text-blue-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t.patientName}
              </th>
              <th scope="col" className="px-6 py-3">
                {t.requiredBloodType}
              </th>
              <th scope="col" className="px-6 py-3">
                {t.hospital}
              </th>
              <th scope="col" className="px-6 py-3">
                {t.status}
              </th>
              <th scope="col" className="px-6 py-3">
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {patient.name}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    {patient.bloodType}
                  </span>
                </td>
                <td className="px-6 py-4">{patient.hospital}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" onClick={() => handleEditPatient(patient)}>
                      {t.edit}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => handleDeletePatient(patient)}
                    >
                      {t.delete}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Patient Dialog */}
      <AddPatientDialog
        open={isEditPatientOpen}
        onOpenChange={setIsEditPatientOpen}
        patient={selectedPatient}
        isEditing={true}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              {t.delete} {patientToDelete?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-gray-500 dark:text-gray-400">
              هل أنت متأكد من حذف هذا المريض؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
          </div>
          <div className="flex justify-center space-x-2 rtl:space-x-reverse">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button variant="destructive" onClick={confirmDeletePatient}>
              {t.delete}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
