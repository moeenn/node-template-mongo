import { Service } from "typedi"
import Database, { Model } from "@/Infra/Database/Database"
import Schema, { IResetPassword } from "@/Infra/Database/Schema/ResetPasswordSchema"
import Random from "@/Application/Helpers/Random"

export { IResetPassword } from "@/Infra/Database/Schema/ResetPasswordSchema"

@Service()
export default class ResetPasswordModel {
  public model: Model<IResetPassword>

  constructor(private database: Database) {
    this.model = this.database.conn.model<IResetPassword>("reset-passwords", Schema)
  }

  async create(userID: string): Promise<IResetPassword> {
    const data = { 
      user_id: userID, 
      reset_token: Random.string(16),
    }

    return await this.model.create(data)
  }
}
