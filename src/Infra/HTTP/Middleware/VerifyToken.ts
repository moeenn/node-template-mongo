import { Container } from "typedi"
import AuthService from "@/Domain/Services/AuthService"
import { FastifyAuthFunction } from "@fastify/auth"
import { Request, Response, Done } from "@/Infra/HTTP/Server"

const authService = Container.get(AuthService)

const VerifyToken: FastifyAuthFunction = (
  req: Request,
  _res: Response,
  done: Done
): void => {
  const auth = req.headers["authorization"]
  if (!auth) {
    return done(new Error("unauthorized"))
  }

  const [, token] = auth.split(" ")
  if (!token) {
    return done(new Error("unauthorized"))
  }

  authService
    .findUserByToken(token)
    .then(user => {
      if (!user) {
        return done(new Error("unauthorized"))
      }

      req.requestContext.set("user", user)
      req.requestContext.set("token", token)
      done()
    })
}

export default VerifyToken