import { NextFunction, Request, Response } from "express"
import mongoose from "mongoose"
import { ServiceError } from "../services/Service"
import { ERROR } from "../../config/api.status"

export default async (err: any, req: Request, res: Response, next: NextFunction) => {
  // if (req.file) await gfs.delete(new mongoose.Types.ObjectId(req.file.id))
  // console.error("[ERROR]: ", err)
  // if (err instanceof JsonWebTokenError) {
  //   return res.status(400).json({
  //     status: ERROR,
  //     message: err.message,
  //   })
  // }
  if(err instanceof ServiceError) {
    return res.status(400).json({
      status: ERROR,
      message:  err.message,
    })
  }
  console.log("ERROR", err)
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      status: ERROR,
      message: err.errors[Object.keys(err.errors)[0]].message,
    })
  }

  if (err.code === 11000 && (err.name === "MongoError" || err.name === "BulkWriteError")) {
    return res.status(400).json({
      status: ERROR,
      message: `${Object.keys(err.keyPattern)[0]} already exists`,
    })
  }

  if (typeof err == "string") {
    // custom application error
    return res.status(400).json({ status: ERROR, message: err })
  }

  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ status: ERROR, message: "Invalid Token", err })
  }

  // default to 500 server error
  return res.status(500).json({ status: ERROR, message: err.message })
}
