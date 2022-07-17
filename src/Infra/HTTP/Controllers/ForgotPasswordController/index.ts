import { Service } from "typedi"
import { Request, Response, report } from "@/Infra/HTTP/Server"
import status from "http-status"

import ForgotPasswordService from "@/Domain/Services/ForgotPasswordService"

@Service()
export default class ForgotPasswordController {
  constructor(
    private forgotPasswordService: ForgotPasswordService
  ) {}

  async requestReset(req: Request, res: Response): Promise<unknown> {
    const user = req.requestContext.get("user")
    
    try {
      await this.forgotPasswordService.requestPasswordReset(user)
    } catch (err) {
      return report(res, err, status.BAD_REQUEST)
    }

    return {
      message: "password request requested successfully",
    }
  }
}