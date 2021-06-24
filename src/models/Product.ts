import mongoose from "mongoose"

const schema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Product name is required!"] },
    description: { type: String, default: "_" },
    price: { type: Number, required: [true, "Product price is required!"] },
    currency: {
      type: String,
      required: [true, "Product currency is required!"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required!"],
    },
    sizes: { type: [String] },
    images: [{ type: String }],
    tags: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    isfeatured: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model("Product", schema)
