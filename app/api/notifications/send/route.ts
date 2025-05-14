import { type NextRequest, NextResponse } from "next/server"
import type { NextApiResponseServerIO } from "@/lib/socket"
import connectDB from "@/lib/mongodb"

export async function POST(req: NextRequest, res: NextApiResponseServerIO) {
  try {
    await connectDB()

    const { notification } = await req.json()

    // Emit to all connected clients or specific user
    if (res.socket.server.io) {
      if (notification.recipient === "all") {
        res.socket.server.io.emit("notification", notification)
      } else {
        res.socket.server.io.to(notification.recipient).emit("notification", notification)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ success: false, error: "فشل في إرسال الإشعار" }, { status: 500 })
  }
}
