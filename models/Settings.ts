import mongoose, { Schema, type Document } from "mongoose"

export interface IWelcomeMessage {
  titleAr: string
  titleEn: string
  messageAr: string
  messageEn: string
  enabled: boolean
  showOnce: boolean
}

export interface ISettings extends Document {
  welcomeMessage: IWelcomeMessage
  updatedAt: Date
}

const SettingsSchema: Schema = new Schema(
  {
    welcomeMessage: {
      titleAr: { type: String, default: "مرحباً بك في نظام إدارة بنك الدم" },
      titleEn: { type: String, default: "Welcome to Blood Bank Management System" },
      messageAr: {
        type: String,
        default:
          "نظام متكامل لإدارة بنك الدم وتنظيم عمليات التبرع والمخزون وبيانات المتبرعين والمرضى. نتمنى لك تجربة مميزة.",
      },
      messageEn: {
        type: String,
        default:
          "A comprehensive system for managing blood banks, organizing donation operations, inventory, and donor and patient data. We wish you a great experience.",
      },
      enabled: { type: Boolean, default: true },
      showOnce: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
)

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema)
