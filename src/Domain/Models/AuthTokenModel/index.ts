import { Service } from "typedi"
import Database, { Model } from "@/Infra/Database/Database"
import Schema, { IAuthToken } from "@/Infra/Database/Schema/AuthTokenSchema"
import Random from "@/Application/Helpers/Random"

@Service()
export default class AuthTokenModel {
  public model: Model<IAuthToken>

  constructor(private database: Database) {
    this.model = this.database.conn.model<IAuthToken>("auth-tokens", Schema)
  }

  public async create(user_id: string): Promise<IAuthToken> {
    const token = Random.string(16)
    return await this.model.create({ user_id, token })
  }
}