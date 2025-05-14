import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { generatePDFReport } from "@/lib/pdf-generator"
import Patient from "@/models/Patient"
import Inventory from "@/models/Inventory"
import Donation from "@/models/Donation"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const { reportType, startDate, endDate } = body

    let data
    let pdfBuffer

    const start = new Date(startDate)
    const end = new Date(endDate)

    switch (reportType) {
      case "donations":
        // جلب بيانات التبرعات
        data = await Donation.find({
          date: { $gte: start, $lte: end },
        }).populate("donorId", "name bloodType")
        pdfBuffer = await generatePDFReport("donations", { donations: data, startDate, endDate })
        break

      case "inventory":
        // جلب بيانات المخزون
        data = await Inventory.find()
        pdfBuffer = await generatePDFReport("inventory", { inventory: data })
        break

      case "patients":
        // جلب بيانات المرضى
        data = await Patient.find({
          createdAt: { $gte: start, $lte: end },
        })
        pdfBuffer = await generatePDFReport("patients", { patients: data, startDate, endDate })
        break

      default:
        return NextResponse.json({ success: false, error: "نوع التقرير غير صحيح" }, { status: 400 })
    }

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${reportType}-report.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating report:", error)
    return NextResponse.json({ success: false, error: "فشل في إنشاء التقرير" }, { status: 500 })
  }
}
