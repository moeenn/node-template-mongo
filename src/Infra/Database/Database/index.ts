import mongoose, { Connection } from "mongoose"
import { Service } from "typedi"
import DatabaseConfig from "@/Application/Config/Database"

export type Model<T> = mongoose.Model<T, Obj, Obj, Obj, unknown>

export interface IDatabase {
  conn: Connection
}

@Service()
export default class Database {
  public conn: Connection

  constructor(config: DatabaseConfig) {
    const URI = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`
    this.conn = mongoose.createConnection(URI)

    this.conn.on(
      "error",
      console.error.bind(console, "MongoDB connection error:")
    )      
  }
}