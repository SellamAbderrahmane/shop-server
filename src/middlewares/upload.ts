import multer from "multer"
import { Request } from "express"
import GridfsStorage from "multer-gridfs-storage"
import { v4 as uuidV4 } from "uuid"
import path from "path"
import config from "../../config"

//create storage engine
const storage = new GridfsStorage({
  options: {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  url: config.dbUrl,
  file: (req: Request, file: any) =>
    new Promise((resolve, reject) => {
      //  filename before storing it
      const filename = `${uuidV4()}${path.extname(file.originalname)}`

      let fileinfo

      if (file.mimetype.includes("image/")) {
        fileinfo = {
          filename,
          bucketName: "photo",
        }
      } else {
        fileinfo = {
          filename,
          bucketName: "document",
        }
      }

      resolve(fileinfo)
    }),
})

export default multer({ storage })
