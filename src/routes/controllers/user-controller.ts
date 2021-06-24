import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ServiceError } from "../../services/Service"
import { Inject } from "typescript-ioc"
import { IUserService } from "../../services"
import { SUCCESS } from "../../../config"

export interface IUserController {
  signIn(req: Request, res: Response, next: NextFunction): any
  signUp(req: Request, res: Response, next: NextFunction): any
  verifyUser(req: Request, res: Response, next: NextFunction): any
  getUserById(req: Request, res: Response, next: NextFunction): any
}

export class UserController implements IUserController {
  @Inject
  userService: IUserService

  signIn = async (req: Request, res: Response, next: any) => {
    try {
      const { email, password } = req.body
      //authenticate
      if (!email || !password) throw Error("Invalid email/password")

      const user = await this.userService.signIn(email, password)

      const accessToken = jwt.sign(
        {
          currentUserId: user._id,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET
      )

      return res.status(200).json({
        accessToken,
        user,
      })
    } catch (error) {
      next(error)
    }
  }

  signUp = async (req: Request, res: Response, next: any) => {
    try {
      const { ...userData } = req.body

      if (!userData) {
        return new ServiceError("Please Enter required info")
      }

      if (req.file) {
        userData.image = req.file.id
      }

      const user = await this.userService.signUp(userData)
      return res.status(200).json({
        user,
        message: "User added successffuly",
      })
    } catch (error) {
      next(error)
    }
  }

  verifyUser = async (req: Request, res: Response, next: any) => {
    try {
      const { currentUserId } = req.currentUser
      const user = await this.userService.get(currentUserId)
      return res.status(200).json({
        status: SUCCESS,
        token: req.token,
        user,
      })
    } catch (error) {
      next(error)
    }
  }

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { currentUserId } = req.currentUser
      const user = await this.userService.get(currentUserId)

      const userSocial = await this.userService.get
      return res.status(200).json({
        status: SUCCESS,
        user,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new UserController()
