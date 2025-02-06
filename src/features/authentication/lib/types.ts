import { z } from "zod";
import { SignInFormSchema, SignUpFormSchema } from "./schemas";

export type SignInFormSchemaType = z.infer<typeof SignInFormSchema>
export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>