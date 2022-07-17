import { Service } from "typedi"
import UserModel, { IUser } from "@/Domain/Models/UserModel"
import { IResetPassword } from "@/Infra/Database/Schema/ResetPasswordSchema"
import ResetPasswordModel from "@/Domain/Models/ResetPasswordModel"

@Service()
export default class ForgotPasswordService {
  constructor(
    private userModel: UserModel,
    private resetPasswordModel: ResetPasswordModel
  ) { }

  /**
   *  generate entry for password reset for a user
   * 
  */
  public async requestPasswordReset(user: IUser): Promise<IResetPassword> {
    if (!user.id) {
      throw new Error("user does not have an ID")
    }

    return this.resetPasswordModel.create(user.id)
  }
}