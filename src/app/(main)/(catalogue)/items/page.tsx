import { DataTable } from "@/components/custom-ui/data-table/data-table"
import { getItems } from "@/features/catalogue/items/server/actions/items-actions"
import CreateItemButton from "@/features/catalogue/items/ui/create-item/create-item-button"
import { itemsTableColumns } from "@/features/catalogue/items/ui/table-items/items-table-columns"

async function ItemsPage() {

      const items = await getItems()

      return (
            <div className="min-h-screen">
                  <div className="flex flex-col w-full gap-y-2">
                        <div className="flex w-full justify-between items-center">
                              <h1 className="text-2xl font-bold">Articles</h1>
                              <div className="flex flex-row-reverse gap-x-1">
                                    <CreateItemButton />
                              </div>
                        </div>
                        <div className="mx-auto w-full">
                              <DataTable columns={itemsTableColumns} data={items.documents} />
                        </div>
                  </div>
            </div>
      )
}

export default ItemsPage