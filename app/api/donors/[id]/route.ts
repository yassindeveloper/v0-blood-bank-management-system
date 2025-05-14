import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Donor from "@/models/Donor"
import { generatePDFReport } from "@/lib/pdf-generator"

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB()
    const { id } = context.params

    const donor = await Donor.findById(id)

    if (!donor) {
      return NextResponse.json({ success: false, error: "المتبرع غير موجود" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: donor })
  } catch (error) {
    console.error("Error fetching donor:", error)
    return NextResponse.json({ success: false, error: "فشل في جلب بيانات المتبرع" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB()
    const { id } = context.params
    const body = await req.json()

    const donor = await Donor.findByIdAndUpdate(id, body, { new: true })

    if (!donor) {
      return NextResponse.json({ success: false, error: "المتبرع غير موجود" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: donor })
  } catch (error) {
    console.error("Error updating donor:", error)
    return NextResponse.json({ success: false, error: "فشل في تحديث بيانات المتبرع" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB()
    const { id } = context.params

    const donor = await Donor.findByIdAndDelete(id)

    if (!donor) {
      return NextResponse.json({ success: false, error: "المتبرع غير موجود" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    console.error("Error deleting donor:", error)
    return NextResponse.json({ success: false, error: "فشل في حذف المتبرع" }, { status: 500 })
  }
}

// إنشاء PDF للمتبرع
export async function POST(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB()
    const { id } = context.params

    const donor = await Donor.findById(id)

    if (!donor) {
      return NextResponse.json({ success: false, error: "المتبرع غير موجود" }, { status: 404 })
    }

    const pdfBuffer = await generatePDFReport("donor", donor.toObject())

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="donor-${id}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Error generating donor PDF:", error)
    return NextResponse.json({ success: false, error: "فشل في إنشاء تقرير PDF" }, { status: 500 })
  }
}
