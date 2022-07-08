import mongoose, { Connection } from "mongoose"
import { Service } from "typedi"
import DatabaseConfig from "@/Application/Config/Database"

export interface IDatabase {
  conn: Connection
}

@Service()
export default class Database {
  private conn: Connection

  constructor(config: DatabaseConfig) {
    const URI = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
    mongoose.connect(URI)
    this.conn = mongoose.connection

    this.conn.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    )
  }
}