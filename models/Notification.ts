import mongoose, { Schema, type Document } from "mongoose"

export interface INotification extends Document {
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  recipient: string
  read: boolean
  date: Date
}

const NotificationSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true, enum: ["info", "success", "warning", "error"] },
    recipient: { type: String, required: true }, // userId or 'all'
    read: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.models.Notification || mongoose.model<INotification>("Notification", NotificationSchema)
