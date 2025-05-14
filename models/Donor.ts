import mongoose, { Schema, type Document } from "mongoose"

export interface IDonor extends Document {
  name: string
  email: string
  phone: string
  address: string
  bloodType: string
  dateOfBirth: Date
  gender: "male" | "female"
  weight: number
  lastDonation: Date
  qrCode: string
  createdAt: Date
  updatedAt: Date
}

const DonorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
    bloodType: { type: String, required: true, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    weight: { type: Number, required: true },
    lastDonation: { type: Date },
    qrCode: { type: String, unique: true },
  },
  { timestamps: true },
)

export default mongoose.models.Donor || mongoose.model<IDonor>("Donor", DonorSchema)
