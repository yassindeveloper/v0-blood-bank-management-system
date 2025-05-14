"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTranslations } from "@/hooks/use-translations"
import Image from "next/image"
import { Download } from "lucide-react"

interface DonorQrCodeProps {
  donorId: string
  qrCode: string
  name: string
}

export default function DonorQrCode({ donorId, qrCode, name }: DonorQrCodeProps) {
  const t = useTranslations()

  const downloadQrCode = () => {
    const link = document.createElement("a")
    link.href = qrCode
    link.download = `donor-${donorId}-qrcode.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.donorQrCode}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="mb-4 p-2 bg-white rounded-lg">
          <Image
            src={qrCode || "/placeholder.svg"}
            alt={`QR Code for ${name}`}
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>
        <p className="text-sm text-gray-500 mb-4 text-center">{t.scanQrCodeToViewDonor}</p>
        <Button onClick={downloadQrCode} className="flex items-center space-x-2 rtl:space-x-reverse" variant="outline">
          <Download size={16} />
          <span>{t.downloadQrCode}</span>
        </Button>
      </CardContent>
    </Card>
  )
}
