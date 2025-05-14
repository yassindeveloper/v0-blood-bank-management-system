import mongoose, { Schema, type Document } from "mongoose"

export interface IInventory extends Document {
  bloodType: string
  units: number
  status: "available" | "low" | "critical"
  lastUpdated: Date
}

const InventorySchema: Schema = new Schema(
  {
    bloodType: { type: String, required: true, unique: true, enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
    units: { type: Number, required: true, default: 0 },
    status: { type: String, required: true, enum: ["available", "low", "critical"], default: "available" },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.models.Inventory || mongoose.model<IInventory>("Inventory", InventorySchema)
