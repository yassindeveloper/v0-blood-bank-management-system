import QRCode from "qrcode"

export async function generateQRCode(data: string): Promise<string> {
  try {
    // إنشاء رمز QR كصورة base64
    const qrCodeDataURL = await QRCode.toDataURL(data, {
      errorCorrectionLevel: "H",
      margin: 1,
      width: 300,
    })

    return qrCodeDataURL
  } catch (error) {
    console.error("Error generating QR code:", error)
    throw error
  }
}
