import { Router } from "express"
import { verifyToken } from "../middlewares/authorization"
import upload from "../middlewares/upload"
import { IUserController } from "./controllers"

export default function ({ userController }: { userController: IUserController }) {
  const router = Router()

  router.post("/sign-in", userController.signIn)
  router.post("/sign-up", upload.single("image"), userController.signUp)
  router.get("/verify-user", verifyToken, userController.verifyUser)
  router.get("/user-info", verifyToken, userController.getUserById)

  return router
}
