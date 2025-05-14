import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Donor from "@/models/Donor"
import Patient from "@/models/Patient"
import Inventory from "@/models/Inventory"
import Donation from "@/models/Donation"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const { lastSyncTimestamp, deviceId } = await req.json()

    // تحويل الطابع الزمني إلى كائن تاريخ
    const lastSync = lastSyncTimestamp ? new Date(lastSyncTimestamp) : new Date(0)

    // جلب البيانات التي تم تحديثها بعد آخر مزامنة
    const donors = await Donor.find({ updatedAt: { $gt: lastSync } })
    const patients = await Patient.find({ updatedAt: { $gt: lastSync } })
    const inventory = await Inventory.find({ updatedAt: { $gt: lastSync } })
    const donations = await Donation.find({ updatedAt: { $gt: lastSync } })

    return NextResponse.json({
      success: true,
      data: {
        donors,
        patients,
        inventory,
        donations,
        syncTimestamp: new Date().toISOString(),
        deviceId,
      },
    })
  } catch (error) {
    console.error("Error syncing data:", error)
    return NextResponse.json({ success: false, error: "فشل في مزامنة البيانات" }, { status: 500 })
  }
}

// استقبال البيانات من التطبيق الجوال
export async function PUT(req: NextRequest) {
  try {
    await connectDB()

    const { donors, patients, donations, deviceId } = await req.json()

    // تحديث/إضافة البيانات من الجهاز
    for (const donor of donors) {
      await Donor.findByIdAndUpdate(donor._id, donor, { upsert: true, new: true })
    }
    for (const patient of patients) {
      await Patient.findByIdAndUpdate(patient._id, patient, { upsert: true, new: true })
    }
    for (const donation of donations) {
      await Donation.findByIdAndUpdate(donation._id, donation, { upsert: true, new: true })
    }

    return NextResponse.json({ success: true, message: "تم تحديث البيانات بنجاح" })
  } catch (error) {
    console.error("Error updating data:", error)
    return NextResponse.json({ success: false, error: "فشل في تحديث البيانات" }, { status: 500 })
  }
}
