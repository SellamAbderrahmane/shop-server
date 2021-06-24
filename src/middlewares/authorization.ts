import { ERROR } from "../../config"
import jwt from "jsonwebtoken"

import { NextFunction, Request, Response } from "express"

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authorization = req && req.headers["authorization"]
  const token = authorization && authorization.split(" ")[1]
  if (!token) return res.status(400).json({ status: ERROR, message: "No access token provided" })

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    {
      maxAge: process.env.EXPIRESIN,
    },
    (err, user) => {
      if (err) return res.sendStatus(403)
      req.currentUser = user
      req.token = token
      next()
    }
  )
}

module.exports.authorize = (roles: any[] = []) => {
  if (typeof roles === "string") roles = [roles]

  return [
    verifyToken,
    // authorize based on user role
    (req: Request, res: Response, next: NextFunction) => {
      if (roles.length && !roles.includes(req.currentUser.role)) {
        // user's role is not authorized
        return res.status(401).json({ status: ERROR, message: "Unauthorized" })
      }
      next()
    },
  ]
}
