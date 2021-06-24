import { Router } from "express"
import upload from "../middlewares/upload"
import { IFileController } from "./controllers"

export default (fileController: IFileController) => {
  const router = Router()
  router.post("/upload", upload.single("file"), fileController.upload)
  router.get("/:filename", fileController.getFile)
  router.get("/id/:id", fileController.getFileById)
  router.get("/delete/:filename", fileController.deleteFile)
  router.get("/delete/id/:id", fileController.deleteFileById)
  return router
}
