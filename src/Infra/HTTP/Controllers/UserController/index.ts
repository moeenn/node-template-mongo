import { Service } from "typedi"
import UserModel from "@/Domain/Models/UserModel"

@Service()
export default class UserController {
  constructor(
    private userModel: UserModel,
  ) {}

  public async index(): Promise<unknown> {
    return await this.userModel.all()
  }
}