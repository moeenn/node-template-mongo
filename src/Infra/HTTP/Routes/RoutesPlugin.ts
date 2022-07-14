import fp from "fastify-plugin"
import { ServerInstance } from "@/Infra/HTTP/Server"
import FastifyAuth from "@fastify/auth"
import VerifyToken from "@/Infra/HTTP/Middleware/VerifyToken"
import routes from "."

async function RoutesPlugin(fastify: ServerInstance): Promise<void> {
  for (const route of routes) {
    const { method, url, handler } = route

    if (!route.auth) {
      fastify.route({ method, url, handler })
    }
  }

  fastify
    .register(FastifyAuth)
    .after(() => {
      for (const route of routes) {
        const { method, url, handler } = route

        if (route.auth) {
          fastify.route({
            method, url, handler,
            preHandler: fastify.auth([VerifyToken]),
          })
        }
      }
    })

  // TODO: remove
  /** 
   *  public routes
   * 
  */
  // fastify.get("/users", { handler: (req, res) => userController.index(req, res) })
  // fastify.post("/register", { handler: (req, res) => authController.register(req, res) })
  // fastify.post("/login", { handler: (req, res) => authController.login(req, res) })

  // fastify
  //   .register(FastifyAuth)
  //   .after(() => {
  //     /**
  //      *  protected routes
  //      * 
  //     */
  //     fastify.get("/logout", {
  //       preHandler: fastify.auth([VerifyToken]),
  //       handler: (req, res) => authController.logout(req, res)
  //     })

  //   })
}

export default fp(RoutesPlugin)