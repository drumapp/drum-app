"use server"
import { IActionResponse } from "@/lib/interfaces"
import { ICreateItemCategoryResponse } from "../lib/interfaces"
import { ItemCategoryType } from "../lib/enums"
import { CreateItemCategoryFormSchema, CreateItemCategoryFormSchemaType } from "../lib/schemas"
import { createSessionClient } from "@/lib/appwrite"
import { appwrite_collection_catalogue_items_categories, appwrite_database } from "@/configuration"
import { ID } from "node-appwrite"
import { revalidatePath } from "next/cache"
import { handleActionError } from "@/lib/action-errors"

export async function createItemCategory(prevState: unknown, formData: FormData): Promise<IActionResponse<ICreateItemCategoryResponse | null>> {

      // Acquisition
      const title = formData.get("title")
      const description = formData.get("description")
      const type = formData.get("type") as ItemCategoryType
      console.log(title, description, type);

      
      try {
            // Validation
            const categoryData: CreateItemCategoryFormSchemaType = CreateItemCategoryFormSchema.parse({ title, description, type })
            console.log(categoryData);
            
            // Processing
            const client = await createSessionClient()
            if (!client) { throw new Error("L'utilisateur n'est pas connecté.") }
            const { user, databases} = client
            const tenantId = user.prefs.tenantId

      
            const category = await databases.createDocument(appwrite_database, appwrite_collection_catalogue_items_categories, ID.unique(), { ...categoryData, tenantId })
            const data: ICreateItemCategoryResponse = { id: category.$id }
            
            revalidatePath("/categories")
            return {success: true, data: data, error: undefined}
      } catch (error) {
            return handleActionError(error)
      }
}