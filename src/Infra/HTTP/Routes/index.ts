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

/**
 *  declare all application routes
 * 
*/
const routes: Route[] = [
  { url: "/users", method: "GET", auth: false, handler: userController.index.bind(UserController) },
  { url: "/register", method: "POST", auth: false, handler: authController.register.bind(AuthController) },
  { url: "/login", method: "POST", auth: false, handler: authController.login.bind(AuthController) },
  { url: "/logout", method: "GET", auth: true, handler: authController.logout.bind(AuthController) },
]

export default routes