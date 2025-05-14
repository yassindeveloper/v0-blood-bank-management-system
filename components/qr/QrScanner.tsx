"use client"

import { useState, useRef } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "@/hooks/use-translations"

interface QrScannerProps {
  onScanSuccess: (decodedText: string, decodedResult: any) => void
  onScanError?: (errorMessage: string) => void
}

export default function QrScanner({ onScanSuccess, onScanError }: QrScannerProps) {
  const t = useTranslations()
  const [isScanning, setIsScanning] = useState(false)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const scannerDivRef = useRef<HTMLDivElement>(null)

  const startScanner = () => {
    if (!scannerDivRef.current) return

    scannerRef.current = new Html5QrcodeScanner(
      "qr-scanner",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        formatsToSupport: [0], // QR Code only
        rememberLastUsedCamera: true,
      },
      false, // verbose
    )

    scannerRef.current.render(
      (decodedText, decodedResult) => {
        // إيقاف الماسح بعد النجاح
        if (scannerRef.current) {
          scannerRef.current.clear()
        }
        setIsScanning(false)
        onScanSuccess(decodedText, decodedResult)
      },
      (errorMessage) => {
        if (onScanError) {
          onScanError(errorMessage)
        } else {
          console.error(errorMessage)
        }
      },
    )

    setIsScanning(true)
  }

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear()
      scannerRef.current = null
    }
    setIsScanning(false)
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          {!isScanning ? (
            <Button onClick={startScanner} className="bg-red-600 hover:bg-red-700">
              {t.scanQrCode}
            </Button>
          ) : (
            <>
              <div ref={scannerDivRef} id="qr-scanner" className="w-full"></div>
              <Button
                onClick={stopScanner}
                variant="outline"
                className="mt-4 border-red-600 text-red-600 hover:bg-red-50"
              >
                {t.stopScanning}
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
