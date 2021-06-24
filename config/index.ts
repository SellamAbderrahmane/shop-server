import dotenv from "dotenv"

dotenv.config()

export default {
  dbUrl: process.env.MONGOATLASURL || process.env.MONGOURL,
  port: parseInt(process.env.PORT || "3001"),
}

export * from "./api.status"
export * from "./db.config"
