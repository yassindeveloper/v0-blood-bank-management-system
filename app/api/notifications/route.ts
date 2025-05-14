import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Notification from "@/models/Notification"

export async function GET(req: NextRequest) {
  try {
    await connectDB()

    const searchParams = req.nextUrl.searchParams
    const recipient = searchParams.get("recipient") || "all"

    const query = {
      $or: [{ recipient: recipient }, { recipient: "all" }],
    }

    const notifications = await Notification.find(query).sort({ date: -1 }).limit(50)

    return NextResponse.json({ success: true, data: notifications })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ success: false, error: "فشل في جلب الإشعارات" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()

    const notification = new Notification(body)
    await notification.save()

    return NextResponse.json({ success: true, data: notification })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json({ success: false, error: "فشل في إنشاء إشعار" }, { status: 500 })
  }
}
