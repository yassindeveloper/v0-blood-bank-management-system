import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Donor from "@/models/Donor"
import { generateQRCode } from "@/lib/qrcode"

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const searchParams = req.nextUrl.searchParams
    const search = searchParams.get("search") || ""

    let query = {}
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { bloodType: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      }
    }

    const donors = await Donor.find(query).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: donors })
  } catch (error) {
    console.error("Error fetching donors:", error)
    return NextResponse.json({ success: false, error: "فشل في جلب البيانات" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()

    // Generate QR code for donor
    const qrData = JSON.stringify({
      id: new Date().getTime().toString(),
      name: body.name,
      bloodType: body.bloodType,
      type: "donor",
    })

    const qrCode = await generateQRCode(qrData)

    const donor = new Donor({
      ...body,
      qrCode,
    })

    await donor.save()

    return NextResponse.json({ success: true, data: donor })
  } catch (error: any) {
    console.error("Error creating donor:", error)
    return NextResponse.json({ success: false, error: error.message || "فشل في إنشاء متبرع جديد" }, { status: 500 })
  }
}
