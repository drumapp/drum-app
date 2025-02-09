"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { ColumnDataType, ExtendedColumnMeta } from "@/components/custom-ui/data-table/data-table";
import { NumberFilter } from "@/lib/interfaces";
import { SortingButton } from "@/components/custom-ui/data-table/data-table-sorting-button"
import { cn } from "@/lib/utils"
import { formatPrice, numberFilterFn, numericSortingFn } from "@/components/custom-ui/data-table/data-table-utils"
import { Checkbox } from "@/components/ui/checkbox"
import { IItemModel } from "../../lib/interfaces";
import { toast } from "sonner";




// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const itemsTableColumns: ColumnDef<IItemModel, any>[] = [
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
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemModel>)?.label ?? column.columnDef.id ?? ""} /> },
            cell: ({ row }) => { return <div className="text-left font-medium">{row.original.$id}</div> },
            filterFn: (row, id, value: string) => { return row.original.$id.toLowerCase().includes(value.toLowerCase()) },
            meta: { type: ColumnDataType.text, label: "ID", isFilterable: true },
      },
      {
            accessorKey: "title",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemModel>)?.label ?? column.columnDef.id ?? ""} /> },
            cell: ({ row }) => { return <div className="w-[120px] text-left font-medium capitalize">{row.original.title}</div> },
            filterFn: (row, id, value: string) => { return row.original.title.toLowerCase().includes(value.toLowerCase()) },
            meta: { type: ColumnDataType.text, label: "Titre", isFilterable: true },

      },
      {
            accessorKey: "description",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemModel>)?.label ?? column.columnDef.id ?? ""} /> },
            cell: ({ row }) => { return <div className="w-[300px] text-left font-medium truncate " title={row.original.description}>{row.original.description}</div> },
            filterFn: (row, id, value: string) => { return row.original.description.toLowerCase().includes(value.toLowerCase()) },
            meta: { type: ColumnDataType.text, label: "Description", isFilterable: true },
      },
      {
            accessorKey: "purchasePrice",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemModel>)?.label ?? column.columnDef.id ?? ""} /> },
            cell: ({ row }) => { return <div className="text-left font-medium uppercase">{formatPrice(row.original.purchasePrice)}</div> },
            filterFn: (row, id, filter: NumberFilter) => numberFilterFn(row, id, filter),
            sortingFn: (rowA, rowB) => numericSortingFn(rowA, rowB, "purchasePrice"),
            meta: { type: ColumnDataType.number, label: "Prix Achat", isFilterable: true },
      },
      {
            accessorKey: "sellingPrice",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemModel>)?.label ?? column.columnDef.id ?? ""} /> },
            cell: ({ row }) => { return <div className="text-left font-medium uppercase">{formatPrice(row.original.sellingPrice)}</div> },
            filterFn: (row, id, filter: NumberFilter) => numberFilterFn(row, id, filter),
            sortingFn: (rowA, rowB) => numericSortingFn(rowA, rowB, "sellingPrice"),
            meta: { type: ColumnDataType.number, label: "Prix Vente", isFilterable: true },
      },
      {
            accessorKey: "margin",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemModel>)?.label ?? column.columnDef.id ?? ""} /> },
            cell: ({ row }) => {
                  const purchasePrice = row.original.purchasePrice
                  const sellingPrice = row.original.sellingPrice
                  const margin = sellingPrice - purchasePrice
                  return <div className={cn("text-left font-medium uppercase", margin < 0 && "text-red-500 font-semibold")}>{formatPrice(margin)}</div>
            },
            filterFn: (row, id, filter: NumberFilter) => numberFilterFn(row, id, filter),
            sortingFn: (rowA, rowB) => {
                  const marginA = rowA.original.sellingPrice - rowA.original.purchasePrice;
                  const marginB = rowB.original.sellingPrice - rowB.original.purchasePrice;
                  return marginA - marginB;
            },
            meta: { type: ColumnDataType.number, label: "Marge", isFilterable: true },
      },
      {
            accessorKey: "minThreshold",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemModel>)?.label ?? column.columnDef.id ?? ""} /> },
            meta: { type: ColumnDataType.number, label: "Seuil Min", isFilterable: false },
            sortingFn: (rowA, rowB) => numericSortingFn(rowA, rowB, "minThreshold"),

      },
      {
            accessorKey: "maxThreshold",
            header: ({ column }) => { return <SortingButton column={column} headerText={(column.columnDef.meta as ExtendedColumnMeta<IItemModel>)?.label ?? column.columnDef.id ?? ""} /> },
            meta: { type: ColumnDataType.number, label: "Seuil Min", isFilterable: false },
            sortingFn: (rowA, rowB) => numericSortingFn(rowA, rowB, "maxThreshold"),
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
                                          toast.info("L'identifiant de l'article a été ajouté au presse papier.")
                                    }} >Copier ID</DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive font-semibold" onClick={() => console.log("Delete Item")}>Supprimer</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Détails</DropdownMenuItem>
                              </DropdownMenuContent>
                        </DropdownMenu>
                  )
            },
            meta: { isFilterable: false },
      }
]

