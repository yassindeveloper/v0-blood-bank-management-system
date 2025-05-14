import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Inventory from "@/models/Inventory"
import { notifyLowInventory } from "@/lib/notifications"

export async function GET() {
  try {
    await connectDB()

    const inventory = await Inventory.find().sort({ bloodType: 1 })

    return NextResponse.json({ success: true, data: inventory })
  } catch (error) {
    console.error("Error fetching inventory:", error)
    return NextResponse.json({ success: false, error: "فشل في جلب بيانات المخزون" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const { bloodType, units, operation } = body

    let inventory = await Inventory.findOne({ bloodType })

    if (!inventory) {
      // إذا لم يتم العثور على فصيلة الدم، سنقوم بإنشائها
      inventory = new Inventory({
        bloodType,
        units: operation === "add" ? units : 0,
      })
    } else {
      // تحديث وحدات الدم
      if (operation === "add") {
        inventory.units += Number.parseInt(units)
      } else if (operation === "remove") {
        if (inventory.units < units) {
          return NextResponse.json({ success: false, error: "لا توجد وحدات كافية في المخزون" }, { status: 400 })
        }
        inventory.units -= Number.parseInt(units)
      }
    }

    // تحديث حالة المخزون
    if (inventory.units > 20) {
      inventory.status = "available"
    } else if (inventory.units > 10) {
      inventory.status = "low"
      // إرسال إشعار بأن المخزون منخفض
      await notifyLowInventory(bloodType, inventory.units)
    } else {
      inventory.status = "critical"
      // إرسال إشعار بأن المخزون في حالة حرجة
      await notifyLowInventory(bloodType, inventory.units, true)
    }

    inventory.lastUpdated = new Date()

    await inventory.save()

    return NextResponse.json({ success: true, data: inventory })
  } catch (error) {
    console.error("Error updating inventory:", error)
    return NextResponse.json({ success: false, error: "فشل في تحديث المخزون" }, { status: 500 })
  }
}
