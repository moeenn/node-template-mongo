import crypto from "crypto"

function string(bytes: number): string {
  return crypto.randomBytes(bytes).toString("hex")
}

export default {
  string,
}