"use strict"

import cors from "cors"
import express from "express"
import http from "http"
import morgan from "morgan"
import routes from "./routes"
import { bindServices } from "./services"
import errorHandler from "./middlewares/error-handler"
import config from "../config"

export class ApiServer {
  public PORT: number = 3001

  private readonly app: express.Application
  private server: http.Server = null as any

  constructor() {
    this.app = express()
    this.PORT = config.port
    this.config()
  }

  /**
   * Start the server
   */
  public start() {
    this.server = this.app.listen(this.PORT)

    this.server.on("error", this.onError.bind(this))
    this.server.on("listening", this.onListening.bind(this))
  }

  /**
   * Stop the server (if running).
   * @returns {Promise<boolean>}
   */
  public async stop(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.server) {
        this.server.close(() => {
          return resolve(true)
        })
      } else {
        return resolve(true)
      }
    })
  }

  /**
   * Configure the express app.
   */
  private config(): void {
    // Native Express configuration
    // this.app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }))
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        // credentials: true, // enable set cookie
        allowedHeaders: ["Origin, X-Requested-With, Content-Type, Accept, Authorization"],
      })
    )
    this.app.use(
      express.urlencoded({
        extended: true,
      }),
      express.json()
    )
    bindServices()
    this.app.use(morgan("dev"))
    this.app.use("/v1", routes)
    this.app.use(errorHandler)
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  private onListening() {
    var addr = this.server.address()
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port
    console.log("Listening on " + bind)
  }
  /**
   * Event listener for HTTP server "error" event.
   */
  private onError(error: any) {
    if (error.syscall !== "listen") {
      throw error
    }

    var bind = typeof this.PORT === "string" ? "Pipe " + this.PORT : "Port " + this.PORT

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges")
        process.exit(1)
        break
      case "EADDRINUSE":
        console.error(bind + " is already in use")
        process.exit(1)
        break
      default:
        throw error
    }
  }
}
