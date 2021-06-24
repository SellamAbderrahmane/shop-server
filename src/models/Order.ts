import mongoose from "mongoose"
const schema = new mongoose.Schema(
  {
    customer: { type: mongoose.Types.ObjectId, ref: "user", require: true },
    products: [{ type: mongoose.Types.ObjectId, ref: "product", require: true }],
    price: { type: Number, require: true },
    quantity: { type: Number, require: true },
    codepostal: { type: Number },
    shippingaddress: { type: String },
    shippingcity: { type: String },
    shippingcountry: { type: String },
    shippingemail: { type: String },
  },
  { timestamps: true }
)

export default mongoose.model("Order", schema)
