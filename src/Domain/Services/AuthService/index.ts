import { Service } from "typedi"
import Password from "@/Application/Helpers/Password"
import UserModel from "@/Domain/Models/UserModel"
import AuthTokenModel from "@/Domain/Models/AuthTokenModel"
import { IUser } from "@/Infra/Database/Schema/UserSchema"
import { IRegisterSchema } from "@/Infra/HTTP/Controllers/AuthController/validations/register.schema"
import { ILoginSchema } from "@/Infra/HTTP/Controllers/AuthController/validations/login.schema"

@Service()
export default class AuthService {
  constructor(
    private userModel: UserModel,
    private authTokenModel: AuthTokenModel
  ) {}

  /**
   *  register a new user
   * 
  */
  public async registerUser(data: IRegisterSchema): Promise<IUser> {
    const userData: IUser = { 
      ...data, 
      password: await Password.hash(data.password),
      approved: true 
    }

    return await this.userModel.model.create(userData)
  }

  /**
   *  login a registered user
   * 
  */
  public async loginUser(data: ILoginSchema): Promise<IUser> {
    const user = await this.userModel.model.findOne({ email: data.email })
    if (!user) {
      throw new Error(`User with email ${data.email} not found`)
    }

    const verified = await Password.verify(user.password, data.password)
    if (!verified) {
      throw new Error("invalid email or password")
    }

    const token = await this.authTokenModel.create(user.id)
    return {...user.toObject(), token: token.token }
  }

  /**
   *  log-out a logged-in user
   * 
  */
  public async logoutUser(token: string): Promise<void> {
    const foundToken = await this.authTokenModel.model.findOne({ token })
    if (!foundToken) {
      throw new Error("Invalid token provided")
    }
    foundToken.deleteOne()
  }
}