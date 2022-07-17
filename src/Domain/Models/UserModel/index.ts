import { Service } from "typedi"
import Database, { Model } from "@/Infra/Database/Database"
import Schema, { IUser } from "@/Infra/Database/Schema/UserSchema"

export { IUser } from "@/Infra/Database/Schema/UserSchema"

@Service()
export default class UserModel {
  public model: Model<IUser>

  constructor(private database: Database) {
    this.model = this.database.conn.model<IUser>("users", Schema)
  }

  public async all(): Promise<IUser[]> {
    return await this.model.find()
  }
}
