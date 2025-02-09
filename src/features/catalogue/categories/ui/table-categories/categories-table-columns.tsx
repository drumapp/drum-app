"use client"
import { ColumnDef } from "@tanstack/react-table";
import { IItemCategoryModel } from "../../lib/interfaces";
import { Checkbox } from "@/components/ui/checkbox";
import { SortingButton } from "@/components/custom-ui/data-table/data-table-sorting-button";
import { ColumnDataType, ExtendedColumnMeta } from "@/components/custom-ui/data-table/data-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

export const CategoriesTableColumns: ColumnDef<IItemCategoryModel, unknown>[] = [
      {
            id: "select",
            header: ({ table }) => (
                  <Checkbox
                        checked={
                              table.getIsAllPageRowsSelected() ||
                              (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                  />
            ),
            cell: ({ row }) => (
                  <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                  />
            ),
            enableSorting: false,
            enableHiding: false,
      },
      {
            accessorKey: "$id",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemCategoryModel>)?.label ?? column.columnDef.id ?? ""} /> },
            cell: ({ row }) => { return <div className="text-left font-medium">{row.original.$id}</div> },
            filterFn: (row, id, value: string) => { return row.original.$id.toLowerCase().includes(value.toLowerCase()) },
            meta: { type: ColumnDataType.text, label: "ID", isFilterable: true },
      },
      {
            accessorKey: "title",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemCategoryModel>)?.label ?? column.columnDef.id ?? ""} /> },
            cell: ({ row }) => { return <div className="w-[120px] text-left font-medium capitalize">{row.original.title}</div> },
            filterFn: (row, id, value: string) => { return row.original.title.toLowerCase().includes(value.toLowerCase()) },
            meta: { type: ColumnDataType.text, label: "Titre", isFilterable: true },

      },
      {
            accessorKey: "description",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemCategoryModel>)?.label ?? column.columnDef.id ?? ""} /> },
            cell: ({ row }) => { return <div className="w-[300px] text-left font-medium truncate " title={row.original.description}>{row.original.description}</div> },
            filterFn: (row, id, value: string) => { return row.original.description.toLowerCase().includes(value.toLowerCase()) },
            meta: { type: ColumnDataType.text, label: "Description", isFilterable: true },
      },
      {
            accessorKey: "type",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemCategoryModel>)?.label ?? column.columnDef.id ?? ""} /> },
            cell: ({ row }) => { return <div className="w-[120px] text-left font-medium capitalize" title={row.original.type}>{row.original.type}</div> },
            filterFn: (row, id, value: string) => { return row.original.description.toLowerCase().includes(value.toLowerCase()) },
            meta: { type: ColumnDataType.text, label: "Type", isFilterable: true },
      },
      {
            id: "actions",
            cell: ({ row }) => {
                  const item = row.original

                  return (
                        <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                          <span className="sr-only">Open menu</span>
                                          <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => {
                                          navigator.clipboard.writeText(item.$id)
                                          toast.info("L'identifiant de la catégorie a été ajouté au presse papier.")
                                    }} >Copier ID</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive font-semibold" onClick={() => console.log("Archive Item")}>Archiver</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Détails</DropdownMenuItem>
                              </DropdownMenuContent>
                        </DropdownMenu>
                  )
            },
            meta: { isFilterable: false },
      }

]