import { Request, Response } from "@/Infra/HTTP/Server"

export interface Route {
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE"
  auth: boolean,
  handler: (req: Request, res: Response) => Promise<unknown>
}