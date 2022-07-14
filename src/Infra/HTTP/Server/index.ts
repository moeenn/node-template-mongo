import { Service } from "typedi"
import Fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
  RouteShorthandOptionsWithHandler,
} from "fastify"
import { fastifyRequestContextPlugin } from "@fastify/request-context"
import helmet from "@fastify/helmet"
import Routes from "@/Infra/HTTP/Routes/RoutesPlugin"

export { default as report } from "./helpers/report"
export type ServerInstance = FastifyInstance
export type Request = FastifyRequest
export type Response = FastifyReply
export type Done = (error?: Error) => void
export type RouteOptions = RouteShorthandOptionsWithHandler

@Service()
export default class Server {
  private app: FastifyInstance

  constructor() {
    this.app = Fastify({ logger: true })
    this.registerPlugins()
  }

  private registerPlugins(): void {
    this.app
      .register(helmet)
      .register(Routes)
      .register(fastifyRequestContextPlugin, {
        hook: "preValidation",
        defaultStoreValues: {
          user: { id: "system" }
        }
      })
  }

  async start(port: number): Promise<void> {
    try {
      await this.app.listen({ port })
    } catch (err) {
      this.app.log.error(err)
      process.exit(1)
    }
  }
}