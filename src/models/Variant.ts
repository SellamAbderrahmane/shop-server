import mongoose from "mongoose"
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Variant is unique"],
      required: [true, "Varaint color is required"],
    },
  },
  { timestamps: true, collection: "Variant" }
)

export default mongoose.model("Variant", schema)
