import { MongoConnector } from "../config"
import { ApiServer } from "./api-server"
import { GridFSBucket } from "mongodb"

declare global {
  namespace Express {
    export interface Request {
      currentUser: any
      token: string
    }
  }

  namespace NodeJS {
    interface Global {
      file: GridFSBucket
    }
  }
}

export async function start(): Promise<void> {
  const mongoConnector = new MongoConnector()
  const apiServer = new ApiServer()

  apiServer.start()
  await mongoConnector.connect()
  const graceful = async () => {
    await mongoConnector.disconnect()
    await apiServer.stop()
    process.exit(0)
  }

  // Stop graceful
  process.on("SIGTERM", graceful)
  process.on("SIGINT", graceful)
}

start().catch((err) => {
  console.error(`Error starting server: ${err.message}`)
  process.exit(-1)
})
