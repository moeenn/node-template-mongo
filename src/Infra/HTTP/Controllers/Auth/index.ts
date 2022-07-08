import { Service } from "typedi"
import { Request } from "@/Infra/HTTP/Server"
import UserService from "@/Domain/Services/UserService"

@Service()
export default class AuthController {
  userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  public async index(): Promise<unknown> {
    return await this.userService.allUsers()
  }

  public async create(request: Request): Promise<unknown> {
    return request.body
  }
}