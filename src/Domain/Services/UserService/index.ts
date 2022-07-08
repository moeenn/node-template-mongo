import { Service } from "typedi"
import Database, { Model } from "@/Infra/Database/Database"
import Schema, { IUser } from "@/Infra/Database/Schema/UserSchema"

@Service()
export default class UserService {
  private database: Database
  private model: Model<IUser>

  constructor(database: Database) {
    this.database = database
    this.model = this.database.conn.model<IUser>("users", Schema)
  }

  async allUsers(): Promise<IUser[]> {
    return await this.model.find()
  }
}
