import { Service } from "typedi"
import { Request, Response, report } from "@/Infra/HTTP/Server"
import status from "http-status"
import AuthService from "@/Domain/Services/AuthService"
import validate from "@/Application/Helpers/Validate"
import { RegisterSchema, IRegisterSchema } from "./validations/register.schema"
import { LoginSchema, ILoginSchema } from "./validations/login.schema"
import { IUser } from "@/Infra/Database/Schema/UserSchema"

@Service()
export default class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  public async register(req: Request, res: Response): Promise<unknown> {
    const issues = validate(req.body, RegisterSchema)
    if (issues) {
      return report(res, issues, status.UNPROCESSABLE_ENTITY)
    }

    const body = req.body as IRegisterSchema
    if (body.password !== body.confirm_password) {
      return report(res, {
        message: "passwords don't match"
      }, status.UNPROCESSABLE_ENTITY)
    }

    let user: IUser
    try {
      user = await this.authService.registerUser(body)
    } catch (err) {
      return report(res, err, status.BAD_REQUEST)
    }

    return {
      message: "user registered successfully",
      user,
    }
  }

  public async login(req: Request, res: Response): Promise<unknown> {
    const issues = validate(req.body, LoginSchema)
    if (issues) {
      return report(res, issues, status.UNPROCESSABLE_ENTITY)
    }

    let user: IUser
    try {
      user = await this.authService.loginUser(req.body as ILoginSchema)
    } catch (err) {
      return report(res, err, status.BAD_REQUEST)
    }

    return {
      message: "user logged-in successfully",
      user,
    }
  }

  public async logout(req: Request, res: Response): Promise<unknown> {
    const token = req.requestContext.get("token")

    try {
      await this.authService.logoutUser(token)
    } catch (err) {
      return report(res, err, status.BAD_REQUEST)
    }

    return {
      message: "user logged-out successfully",
    }
  }
}