import mongoose from "mongoose"
const schema = new mongoose.Schema(
  {
    type: { type: String },
    name: {
      type: String,
      unique: [true, "Attribute name is unique"],
      required: [true, "Attribute color is required"],
    },
    values: [
      {
        key: { type: String, required: true },
        value: { type: String },
      },
    ],
  },
  { timestamps: true, collection: "Attribute" }
)

export default mongoose.model("Attribute", schema)
