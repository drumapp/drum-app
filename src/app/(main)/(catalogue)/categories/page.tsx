import { DataTable } from '@/components/custom-ui/data-table/data-table'
import { getCategories } from '@/features/catalogue/categories/server/services'
import CreateCategoryButton from '@/features/catalogue/categories/ui/create-category/create-category-button'
import { CategoriesTableColumns } from '@/features/catalogue/categories/ui/table-categories/categories-table-columns'
import React from 'react'

async function CategoriesPage() {

      const categories = await getCategories();

      return (
            <div className="min-h-screen">
                  <div className="flex flex-col w-full gap-y-2">
                        <div className="flex w-full justify-between items-center">
                              <h1 className="text-2xl font-bold">Catégories d&apos;articles</h1>
                              <div className="flex flex-row-reverse gap-x-1">
                                    <CreateCategoryButton />
                              </div>
                        </div>
                        <div className="mx-auto w-full">
                              <DataTable columns={CategoriesTableColumns} data={categories.documents} />
                        </div>
                  </div>
            </div>
      )
}

export default CategoriesPage