import { z } from "zod";

export const CreateItemFormSchema = z.object({
  title: z.string().min(1, { message: "Le titre est requis.", }),
  description: z.string().min(1, { message: "La description est requise.", }).optional(),
  image: z.any().optional(),
  purchasePrice: z.number().positive({ message: "Le prix d'achat doit être un nombre positif.", }),
  sellingPrice: z.number().positive({ message: "Le prix de vente doit être un nombre positif.", }),
  minThreshold: z.number().nonnegative({ message: "Le seuil minimum doit être un nombre non négatif.", }).optional(),
  maxThreshold: z.number().positive({ message: "Le seuil maximum doit être un nombre positif.", }).optional(),
  isStockable: z.boolean(),
  removeImage: z.enum(["true", "false"]).optional(),
})

export type CreateItemFormSchemaType = z.infer<typeof CreateItemFormSchema>
