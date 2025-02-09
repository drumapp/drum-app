import { IModel } from "@/lib/interfaces"
import { ItemCategoryType } from "./enums"

export interface IItemCategoryModel extends IModel {
      $id: string
      title:string
      description : string
      type: ItemCategoryType
}

export interface ICreateItemCategoryResponse {
      id: string
}
