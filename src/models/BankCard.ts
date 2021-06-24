import mongoose from "mongoose"

const schema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", require: true },
    number: { type: String, require: true },
    cvc: { type: String, require: true },
    addressLine1: { type: String, require: true },
    addressLine2: { type: String, require: true },
    brand: { type: String, require: true },
    country: { type: String, require: true },
    exp_month: { type: Number, require: true },
    exp_year: { type: Number, require: true },
    funding: { type: String, require: true },
    last4: { type: String, require: true },
  },
  { timestamps: true }
)

export default mongoose.model("BankCard", schema)
