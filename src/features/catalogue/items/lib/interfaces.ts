import { IModel } from "@/lib/interfaces"

export interface IItemModel extends IModel {
      $id: string
      title:string
      description : string
      image : string
      purchasePrice : number
      sellingPrice : number
      minThreshold : number
      maxThreshold : number
      isStockable: boolean
}

export interface ICreateItemResponse {
      id: string
      imagePath?: string
}
