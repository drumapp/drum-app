import { z } from "zod";
import { ItemCategoryType } from "./enums";

export const CreateItemCategoryFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis.", }),
  description: z.string().optional(),
  type: z.nativeEnum(ItemCategoryType, { message: "Le type est requis." }),
})

export type CreateItemCategoryFormSchemaType = z.infer<typeof CreateItemCategoryFormSchema>