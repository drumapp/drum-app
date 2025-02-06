"use server"
import { createSessionClient } from "@/lib/appwrite"
import { CreateItemFormSchema, CreateItemFormSchemaType } from "../../lib/schemas"
import { appwrite_bucket_images, appwrite_collection_catalogue_items, appwrite_database } from "@/configuration"
import { ID, Query } from "node-appwrite"
import { IActionResponse } from "@/lib/interfaces"
import { ICreateItemResponse } from "../../lib/interfaces"
import { handleActionError } from "@/lib/action-errors"
import { revalidatePath } from "next/cache"
import { ItemDocument } from "../../lib/types"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createItem(prevState: any, formData: FormData): Promise<IActionResponse<ICreateItemResponse | null>> {

      // Acquisition

      const title = formData.get("title")
      const description = formData.get("description")
      const image = formData.get("image") as File | null
      const removeImage = formData.get("removeImage")
      const sellingPrice = Number(formData.get("sellingPrice") as unknown)
      const purchasePrice = Number(formData.get("purchasePrice") as unknown)
      const minThreshold = Number(formData.get("minThreshold") as unknown)
      const maxThreshold = Number(formData.get("maxThreshold") as unknown)
      const isStockable = Boolean(formData.get("isStockable"))

      try {
            // Validation
            let itemData: CreateItemFormSchemaType = CreateItemFormSchema.parse({ title, description, image, removeImage, sellingPrice, purchasePrice, minThreshold, maxThreshold, isStockable })

            // Processing
            const client = await createSessionClient()
            if (!client) { throw new Error("L'utilisateur n'est pas connecté.") }
            const { user, databases, storage } = client
            const tenantId = user.prefs.tenantId

            let imageUrl = null

            if (image && image.size > 0) {
              // Upload image to Appwrite Storage
              const file = await storage.createFile(appwrite_bucket_images, ID.unique(), image)
        
              // Get the preview URL
              const imageBuffer = await storage.getFilePreview(appwrite_bucket_images, file.$id)
              imageUrl = `data:image/png;base64,${Buffer.from(imageBuffer).toString("base64")}`;
              
              
            } else if (removeImage === "true") {
              // If removeImage is true and there's a previous image, delete it from Appwrite
              if (prevState && prevState.data?.imagePath) {
                await storage.deleteFile(process.env.APPWRITE_BUCKET_ID!, prevState.data?.id)
              }
              imageUrl = null
            } else if (prevState && prevState.data?.imagePath) {
              // Keep the existing image if not changed
              imageUrl = prevState.data?.imagePath
            }
            
            itemData = { ...itemData, image: imageUrl }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { removeImage:unused, ...itemDataWithoutRemoveImage } = itemData;
            

            const item = await databases.createDocument(appwrite_database, appwrite_collection_catalogue_items, ID.unique(), { ...itemDataWithoutRemoveImage, tenantId })
            const data: ICreateItemResponse = { id: item.$id, imagePath: imageUrl }
            revalidatePath("/items")
            return {success: true, data: data, error: undefined}
      } catch (error) {
            return handleActionError(error)
      }
}

export async function getItems() {
      try {
            const client = await createSessionClient()
            if (!client) { throw new Error("L'utilisateur n'est pas connecté.") }
            const { user, databases } = client
            const tenantId = user.prefs.tenantId
            const itemsQuery = [Query.contains("tenantId", tenantId), Query.orderAsc("$createdAt")];
            const items = await databases.listDocuments<ItemDocument>(appwrite_database, appwrite_collection_catalogue_items, itemsQuery )
            return items
      } catch (error) {
            console.log(error);
            return { documents: [], total: 0 };
      }
}
