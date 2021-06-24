import mongoose from "mongoose"
import bcrypt from "bcrypt"

export const USERROLES = ["USER", "ADMIN"]

const schema = new mongoose.Schema(
  {
    name: { type: String, default: "_" },
    email: {
      type: String,
      required: [true, "User email is required!"],
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
    password: { type: String, required: [true, "Password is required!"] },
    role: {
      type: String,
      enum: USERROLES,
      default: "USER",
    },
    lat: { type: Number },
    lng: { type: Number },
    image: { type: String },
    banner: { type: String },
    messageToken: { type: String },
    phone: { type: String, default: "_" },
    address: { type: String, default: "_" },
    isOnline: { type: Boolean, default: false },
    countryCode: { type: String, default: "_" },
    bankCard: { type: mongoose.Types.ObjectId, unique: true },
  },
  { timestamps: true }
)

// schema.pre("findOne", function () {
//   this.select("-__v")
// })

schema.pre("find", function () {
  this.select("-password -__v")
})

schema.pre("save", function (this: any, next: any) {
  if (!this.isModified("password")) {
    return next()
  }
  bcrypt.hash(this.password, 10).then((hashedPassword) => {
    this.password = hashedPassword
    next()
  })
})

schema.methods.comparePassword = async function (this: any, candidatePassword: any) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, function (err: any, isMatch: any) {
      if (err) return reject(err)
      return resolve(isMatch)
    })
  })
}

export default mongoose.model("User", schema)
