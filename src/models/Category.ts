import mongoose from "mongoose"
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category Name Is Required!"],
      unique: true,
    },
    description: { type: String },
    published: { type: Boolean, default: false },
    parent: { type: mongoose.Types.ObjectId, ref: "category" },
    image: { type: String },
    icon: { type: String, default: "fad fa-tag" },
  },
  { timestamps: true }
)

export default mongoose.model("Category", schema)
