import { z } from "zod";

export const SignInFormSchema = z.object({
      email: z.string().email(),
      password: z.string().min(1, "Password is required to sign in")
})

export const SignUpFormSchema = z.object({
      name: z.string().min(1,"Full name is required."),
      email: z.string().email(),
      password: z.string().min(1, "Password is required to sign in."),
      tenantId: z.string().min(1) //TODO: To be removed for production
})