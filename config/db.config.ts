import { config } from "dotenv"
import mongoose from "mongoose"
import { Connection, ConnectionOptions } from "mongoose"

export class MongoConnector {
  private mongoConnection!: Connection
  private uri!: string

  constructor() {
    /**
     * Load environment variables from .env file, where API keys and passwords are configured.
     */
    config()
    ;(mongoose as any).Promise = global.Promise
    // (mongoose as any).Promise = require('bluebird');
    this.uri = process.env.MONGOURL || ""
  }

  /**
   * Initiate connection to MongoDB
   * @returns {Promise<any>}
   */
  public connect(): Promise<any> {
    return new Promise<any>((resolve: any, reject) => {
      // mongoose.connection.once('open', function() {
      //     console.log('MongoDB event open');
      //     console.log('MongoDB connected [%s]', process.env.MONGODB_URI);
      //
      //     mongoose.connection.on('connected', () => {
      //         console.log('MongoDB event connected');
      //     });
      //
      //     mongoose.connection.on('disconnected', () => {
      //         console.log('MongoDB event disconnected');
      //     });
      //
      //     mongoose.connection.on('reconnected', () => {
      //         console.log('MongoDB event reconnected');
      //     });
      //
      //     mongoose.connection.on('error', (err) => {
      //         console.log('MongoDB event error: ' + err);
      //     });
      //
      //     return resolve();
      // });

      const options: ConnectionOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
      }
      this.mongoConnection = mongoose.connection
      mongoose
        .connect(this.uri, options)
        .then(() => {
          console.info("Mongo has connected succesfully")
          global.file = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "photo",
          })
          resolve()
        })
        .catch((err: any) => this.connect())
    })
  }

  /**
   * Disconnects from MongoDB
   * @returns {Promise<any>}
   */
  public disconnect(): Promise<any> {
    return this.mongoConnection.close()
  }
}
