import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Settings from "@/models/Settings"

// الحصول على الإعدادات
export async function GET() {
  try {
    await connectDB()

    // البحث عن الإعدادات أو إنشاء إعدادات افتراضية إذا لم تكن موجودة
    let settings = await Settings.findOne()
    if (!settings) {
      settings = await Settings.create({})
    }

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ success: false, error: "فشل في جلب الإعدادات" }, { status: 500 })
  }
}

// تحديث الإعدادات
export async function PATCH(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()

    // البحث عن الإعدادات أو إنشاء إعدادات افتراضية إذا لم تكن موجودة
    let settings = await Settings.findOne()
    if (!settings) {
      settings = await Settings.create(body)
    } else {
      // تحديث الإعدادات الموجودة
      if (body.welcomeMessage) {
        settings.welcomeMessage = {
          ...settings.welcomeMessage,
          ...body.welcomeMessage,
        }
      }

      await settings.save()
    }

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Error updating settings:", error)
    return NextResponse.json({ success: false, error: "فشل في تحديث الإعدادات" }, { status: 500 })
  }
}
