"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/hooks/use-language"
import { translations } from "@/lib/translations"
import { AddDonorDialog } from "./add-donor-dialog"

interface DonorTableProps {
  searchQuery: string
}

export function DonorTable({ searchQuery }: DonorTableProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const [isEditDonorOpen, setIsEditDonorOpen] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [donorToDelete, setDonorToDelete] = useState<any>(null)

  // In a real app, this data would come from your API
  const [donors, setDonors] = useState([
    {
      id: 1,
      name: "أحمد محمد",
      bloodType: "A+",
      phone: "0123456789",
      lastDonation: "2023-05-15",
      email: "ahmed@example.com",
      address: "القاهرة، مصر",
      gender: "male",
      dateOfBirth: "1990-01-01",
      weight: 75,
    },
    {
      id: 2,
      name: "سارة أحمد",
      bloodType: "O-",
      phone: "0123456788",
      lastDonation: "2023-05-14",
      email: "sara@example.com",
      address: "الإسكندرية، مصر",
      gender: "female",
      dateOfBirth: "1992-03-15",
      weight: 65,
    },
    {
      id: 3,
      name: "محمد علي",
      bloodType: "B+",
      phone: "0123456787",
      lastDonation: "2023-05-13",
      email: "mohamed@example.com",
      address: "الجيزة، مصر",
      gender: "male",
      dateOfBirth: "1985-07-22",
      weight: 80,
    },
    {
      id: 4,
      name: "فاطمة حسن",
      bloodType: "AB+",
      phone: "0123456786",
      lastDonation: "2023-05-12",
      email: "fatma@example.com",
      address: "المنصورة، مصر",
      gender: "female",
      dateOfBirth: "1995-11-10",
      weight: 62,
    },
  ])

  const handleEditDonor = (donor: any) => {
    setSelectedDonor(donor)
    setIsEditDonorOpen(true)
  }

  const handleDeleteDonor = (donor: any) => {
    setDonorToDelete(donor)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteDonor = () => {
    // In a real app, you would call your API to delete the donor
    setDonors(donors.filter((donor) => donor.id !== donorToDelete.id))
    setIsDeleteDialogOpen(false)
  }

  const filteredDonors = donors.filter(
    (donor) =>
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.bloodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.phone.includes(searchQuery),
  )

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
                {t.contactNumber}
              </th>
              <th scope="col" className="px-6 py-3">
                {t.lastDonation}
              </th>
              <th scope="col" className="px-6 py-3">
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.map((donor) => (
              <tr key={donor.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{donor.name}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                    {donor.bloodType}
                  </span>
                </td>
                <td className="px-6 py-4">{donor.phone}</td>
                <td className="px-6 py-4">{donor.lastDonation}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" onClick={() => handleEditDonor(donor)}>
                      {t.edit}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteDonor(donor)}
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

      {/* Edit Donor Dialog */}
      <AddDonorDialog open={isEditDonorOpen} onOpenChange={setIsEditDonorOpen} donor={selectedDonor} isEditing={true} />

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              {t.delete} {donorToDelete?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center text-gray-500 dark:text-gray-400">
              هل أنت متأكد من حذف هذا المتبرع؟ لا يمكن التراجع عن هذا الإجراء.
            </p>
          </div>
          <div className="flex justify-center space-x-2 rtl:space-x-reverse">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button variant="destructive" onClick={confirmDeleteDonor}>
              {t.delete}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
