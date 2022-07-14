import { Response } from "@/Infra/HTTP/Server"

/**
 *  helper for reporting errors from controllers 
 * 
*/
function report(response: Response, error: unknown, status = 400): Promise<void> {
  response.code(status)

  if (error instanceof Error) {
    throw { error: error.message }
  }

  throw error
}

export default report