import { z } from "zod"

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
  user_role: z.enum(["admin", "user"]),  
})

export type IRegisterSchema = z.infer<typeof RegisterSchema> 