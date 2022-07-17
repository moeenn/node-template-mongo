import { Schema } from "mongoose"

export interface IResetPassword {
  user_id: string,
  reset_token: string,
  created_at?: string,
}

export default new Schema(
  {
    user_id: {
      type: String,
      required: true,
      index: true,
    },

    reset_token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    created_at: {
      type: Date,
      default: Date.now()
    },
  }
)
