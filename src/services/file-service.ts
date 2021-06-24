import { Singleton } from "typescript-ioc"
import path from "path"

export abstract class IFileService {
  abstract delete(filename: string): any
  abstract deleteById(id: string): any
  abstract getFile(filename: string): any
}

@Singleton
export class FileService implements IFileService {
  delete(filename: string) {
    return new Promise(async (resolve, reject) => {
      const files = await global.file
        .find({
          filename: filename,
        })
        .toArray()
      const file = files?.[0]

      global.file.delete(file._id, (err, result) => {
        if (err) return reject(err)
        return resolve(result)
      })
    })
  }

  async deleteById(id: string) {
    const files = await global.file.find({ id }).toArray()
    const file = files?.[0] || path.join(__dirname, "..", "public/images/empty.png")

    return file
  }
  async getFile(filename: string) {
    const files = await global.file.find({ filename: filename }).toArray()
    const file = files?.[0] || path.join(__dirname, "..", "public/images/empty.png")

    return file
  }
}
