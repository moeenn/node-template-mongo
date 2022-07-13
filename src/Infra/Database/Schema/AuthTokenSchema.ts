import { Schema } from "mongoose"

export interface IAuthToken {
  id?: string,
  user_id: string,
  token: string,
}

export default new Schema(
  {
    user_id: {
      type: String,
      required: true,
      index: true,
    },
    token: {
      type: String,
      required: true,
      index: true,
    },
  }
)