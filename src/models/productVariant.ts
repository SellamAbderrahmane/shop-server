import mongoose from "mongoose"
const schema = new mongoose.Schema(
  {
    name: { type: String, default: "_" },
  },
  { timestamps: true, collection: "ProductVariant" }
)

export default mongoose.model("ProductVariant", schema)
