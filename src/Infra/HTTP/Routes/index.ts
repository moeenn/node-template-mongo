import { Container } from "typedi"
import { Route } from "./index.types"
import AuthController from "@/Infra/HTTP/Controllers/AuthController"
import UserController from "@/Infra/HTTP/Controllers/UserController"

/**
 *  initialize all controllers
 * 
*/
const userController = Container.get(UserController)
const authController = Container.get(AuthController)

const routes: Route[] = [
  { url: "/users", method: "GET", auth: false, handler: () => userController.index() },
  { url: "/register", method: "POST", auth: false, handler: (req, res) => authController.register(req, res) },
  { url: "/login", method: "POST", auth: false, handler: (req, res) => authController.login(req, res) },
  { url: "/logout", method: "GET", auth: true, handler: (req) => authController.logout(req) },
]

export default routes