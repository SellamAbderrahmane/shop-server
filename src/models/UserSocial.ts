import mongoose from "mongoose"

const schema = new mongoose.Schema(
  {
    user: {type: mongoose.Types.ObjectId, required: true},
    name: { type: String, required: true, unique: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
)

export default mongoose.model("UserSocial", schema)
