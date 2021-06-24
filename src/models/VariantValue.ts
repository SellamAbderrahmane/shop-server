import mongoose from "mongoose"
const schema = new mongoose.Schema(
  {
    variant: { type: mongoose.Types.ObjectId, required: [true, "Variant id is required"] },
    value: {
      type: String,
      unique: [true, "Variant value is unique"],
      required: [true, "Variant value is unique"],
    },
  },
  { timestamps: true, collection: "VariantValue" }
)

export default mongoose.model("VariantValue", schema)
