import mongoose, { Schema, type Document } from "mongoose"

export interface IDonation extends Document {
  donorId: mongoose.Schema.Types.ObjectId
  bloodType: string
  quantity: number
  date: Date
  notes: string
}

const DonationSchema: Schema = new Schema(
  {
    donorId: { type: mongoose.Schema.Types.ObjectId, ref: "Donor", required: true },
    bloodType: { type: String, required: true, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    quantity: { type: Number, required: true, default: 450 },
    date: { type: Date, default: Date.now },
    notes: { type: String },
  },
  { timestamps: true },
)

export default mongoose.models.Donation || mongoose.model<IDonation>("Donation", DonationSchema)
