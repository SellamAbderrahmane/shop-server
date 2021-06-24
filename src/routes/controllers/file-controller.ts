import { SUCCESS } from "../../../config"
import { NextFunction, Response, Request } from "express"
import { IFileService } from "../../services"
import { Inject } from "typescript-ioc"

export abstract class IFileController {
  abstract upload(req: Request, res: Response, next: NextFunction): any
  abstract getFile(req: Request, res: Response, next: NextFunction): any
  abstract getFileById(req: Request, res: Response, next: NextFunction): any
  abstract deleteFile(req: Request, res: Response, next: NextFunction): any
  abstract deleteFileById(req: Request, res: Response, next: NextFunction): any
}

export class FileController implements IFileController {
  @Inject
  fileService: IFileService

  upload = (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(201).json({
        status: SUCCESS,
        file: req.file,
      })
    } catch (error) {
      next(error)
    }
  }

  getFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filename } = req.params
      const file = await this.fileService.getFile(filename)
      return file
    } catch (error) {
      next(error)
    }
  }
  getFileById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const file = await this.fileService.getFile(id)
      return file
    } catch (error) {
      next(error)
    }
  }
  deleteFile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filename } = req.params
      const file = await this.fileService.delete(filename)
      return file
    } catch (error) {
      next(error)
    }
  }
  deleteFileById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const file = await this.fileService.deleteById(id)
      return file
    } catch (error) {
      next(error)
    }
  }
}
