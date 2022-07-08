import { Schema } from "mongoose"

export type IUserRole = "admin" | "user"

export interface IUser {
  id?: string,
  email: string,
  user_role: IUserRole,
  password: string,
  approved: boolean,
}

export default new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user_role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
      default: true,
    }
  }
)