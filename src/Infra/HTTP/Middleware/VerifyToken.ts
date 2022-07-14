import { FastifyAuthFunction } from "@fastify/auth"
import { Request, Response, Done } from "@/Infra/HTTP/Server"

const VerifyToken: FastifyAuthFunction = (
  req: Request,
  _res: Response,
  done: Done
): void => {
  const auth = req.headers["authorization"]
  if (!auth) {
    return done(new Error("Unauthorized"))
  }

  const [, token] = auth.split(" ")
  if (!token) {
    return done(new Error("Unauthorized"))
  }

  if (token !== "q1w2e3r4") {
    return done(new Error("Unauthorized"))
  }

  // TODO: fetch user from DB
  req.requestContext.set("user", { id: 1, email: "something@site.com" })
  done()
}

export default VerifyToken