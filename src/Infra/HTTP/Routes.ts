import fp from "fastify-plugin"
import { Container } from "typedi"
import { ServerInstance } from "./Server"
import AuthController from "./Controllers/AuthController"
import UserController from "./Controllers/UserController"

async function Routes(fastify: ServerInstance): Promise<void> {
  /**
   *  initialize all controllers
   * 
  */
  const userController = Container.get(UserController)
  const authController = Container.get(AuthController)

  /**
   *  register all rountes
   * 
  */
  fastify.get("/users", () => userController.index())
  fastify.post("/register", (req, res) => authController.register(req, res))
  fastify.post("/login", (req, res) => authController.login(req, res))
}

export default fp(Routes)