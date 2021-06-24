import { Router } from "express"
import { UserController, FileController } from "./controllers"
import userRouter from "./user.routes"
import fileRouter from "./file.routes"

const router = Router()

router.use(
  "/auth",
  userRouter({
    userController: new UserController(),
  })
)

router.use("/file", fileRouter(new FileController()))

export default router
