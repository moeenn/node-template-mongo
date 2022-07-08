import fp from "fastify-plugin"
import { Container } from "typedi"
import { ServerInstance } from "./Server"
import AuthController from "./Controllers/Auth"

async function Routes(fastify: ServerInstance): Promise<void> {
  /**
   *  initialize all controllers
   * 
  */
  const authController = Container.get(AuthController)

  /**
   *  register all rountes
   * 
  */
  fastify.get("/users", authController.index)
  fastify.post("/", authController.create)
}

export default fp(Routes)