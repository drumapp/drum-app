"use server"
import { createSessionClient } from "@/lib/appwrite";
import { Query } from "node-appwrite";
import { appwrite_collection_catalogue_items_categories, appwrite_database } from "@/configuration";
import { ItemCategoryDocument } from "../lib/types";

export async function getCategories() {
      try {
            const client = await createSessionClient()
            if (!client) { throw new Error("L'utilisateur n'est pas connecté.") }
            const { user, databases } = client
            const tenantId = user.prefs.tenantId
            const itemsQuery = [Query.contains("tenantId", tenantId), Query.orderAsc("$createdAt")];
            const categories = await databases.listDocuments<ItemCategoryDocument>(appwrite_database, appwrite_collection_catalogue_items_categories, itemsQuery )
            return categories
      } catch (error) {
            console.log(error);
            return { documents: [], total: 0 };
      }
}