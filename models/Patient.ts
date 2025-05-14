import mongoose, { Schema, type Document } from "mongoose"

export interface IPatient extends Document {
  name: string
  email: string
  phone: string
  address: string
  bloodType: string
  hospital: string
  status: "active" | "stable" | "critical"
  dateOfBirth: Date
  qrCode: string
  createdAt: Date
  updatedAt: Date
}

const PatientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    address: { type: String },
    bloodType: { type: String, required: true, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    hospital: { type: String, required: true },
    status: { type: String, required: true, enum: ["active", "stable", "critical"], default: "active" },
    dateOfBirth: { type: Date, required: true },
    qrCode: { type: String, unique: true },
  },
  { timestamps: true },
)

export default mongoose.models.Patient || mongoose.model<IPatient>("Patient", PatientSchema)
