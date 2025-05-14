import Notification from "@/models/Notification"
import fetch from "node-fetch"

export async function createNotification(
  title: string,
  message: string,
  type: "info" | "success" | "warning" | "error",
  recipient = "all",
) {
  try {
    const notification = new Notification({
      title,
      message,
      type,
      recipient,
      read: false,
      date: new Date(),
    })

    await notification.save()

    // إرسال الإشعار في الوقت الحقيقي
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        notification: notification.toObject(),
      }),
    })

    return notification
  } catch (error) {
    console.error("Error creating notification:", error)
    throw error
  }
}

export async function notifyLowInventory(bloodType: string, units: number, isCritical = false) {
  const type = isCritical ? "error" : "warning"
  const title = isCritical ? "مخزون حرج!" : "مخزون منخفض"
  const message = `فصيلة الدم ${bloodType} منخفضة (${units} وحدة${units !== 1 ? "ات" : ""})`

  return createNotification(title, message, type)
}

export async function markNotificationAsRead(notificationId: string) {
  try {
    const notification = await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true })
    return notification
  } catch (error) {
    console.error("Error marking notification as read:", error)
    throw error
  }
}
