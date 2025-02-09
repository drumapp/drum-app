import { z } from "zod";

export const CreateItemCategoryFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis.", }),
  description: z.string().min(1, { message: "La description est requise.", }).optional(),
  type: z.enum(["produit", "service"], {required_error: "Le type est requis."}),
})

export type CreateItemCategoryFormSchemaType = z.infer<typeof CreateItemCategoryFormSchema>