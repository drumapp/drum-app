"use client"

import { ColumnDef, flexRender, SortingState, getCoreRowModel, useReactTable, getPaginationRowModel, getSortedRowModel, ColumnFiltersState, getFilteredRowModel, VisibilityState, ColumnMeta, } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import { DataTablePagination } from "./data-table-pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { NumberFilter, NumberOperator } from "@/lib/interfaces"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export enum ColumnDataType { text = "text", number = "number", date = "date" }

interface IDataTableProps<TData, TValue> {
      columns: ColumnDef<TData, TValue>[]
      data: TData[]

}
export interface ExtendedColumnMeta<TData> extends ColumnMeta<TData, unknown> {
      type?: string
      label?: string
      isFilterable?: boolean
}

export function DataTable<TData, TValue>({ columns, data }: IDataTableProps<TData, TValue>) {
      const [sorting, setSorting] = useState<SortingState>([])
      const [rowSelection, setRowSelection] = React.useState({})
      const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
      const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
      const [filterColumn, setFilterColumn] = useState("")
      const [filterValue, setFilterValue] = useState("")
      const [numberOperator, setNumberOperator] = useState<NumberFilter["operator"]>(NumberOperator.equal)

      const table = useReactTable({
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            onSortingChange: setSorting,
            getSortedRowModel: getSortedRowModel(),
            onColumnFiltersChange: setColumnFilters,
            getFilteredRowModel: getFilteredRowModel(),
            onColumnVisibilityChange: setColumnVisibility,
            onRowSelectionChange: setRowSelection,
            state: {
                  sorting,
                  columnFilters,
                  columnVisibility,
                  rowSelection
            },
      })

      const currentColumn = filterColumn === "" ? table.getColumn(table.getAllColumns()[0].id) : table.getColumn(filterColumn)
      const columnType = (currentColumn?.columnDef.meta as ExtendedColumnMeta<TData>)?.type;
      const visibleColumns = table.getAllColumns().filter(column => column.getIsVisible())
      const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value
            setFilterValue(value)

            if (columnType === "number") {
                  const numericValue = Number.parseFloat(value)
                  if (!isNaN(numericValue)) {
                        currentColumn?.setFilterValue({ value: numericValue, operator: numberOperator })
                  } else {
                        currentColumn?.setFilterValue(undefined)
                  }
            } else {
                  currentColumn?.setFilterValue(value)
            }
      }

      const handleColumnChange = (value: string) => {
            setFilterColumn(value)
            setFilterValue("")
            table.getColumn(value)?.setFilterValue(undefined)
      }

      const handleNumberOperatorChange = (value: NumberFilter["operator"]) => {
            setNumberOperator(value)
            if (filterValue && columnType === "number") {
                  const numericValue = Number.parseFloat(filterValue)
                  if (!isNaN(numericValue)) {
                        currentColumn?.setFilterValue({ value: numericValue, operator: value })
                  }
            }
      }






      return (
            <div className="flex flex-col items-center justify-between w-full gap-y-2">
                  <div className="flex items-center justify-between w-full border p-2 bg-slate-50 rounded-md">
                        <div className="flex items-center gap-4 w-full">
                              <Select value={filterColumn} onValueChange={handleColumnChange}>
                                    <SelectTrigger className="w-[200px] h-10 bg-slate-100">
                                          <SelectValue placeholder="Filtrer une colonne" />
                                    </SelectTrigger>
                                    <SelectContent>
                                          {visibleColumns.map((column) => (
                                                (column.columnDef.meta as ExtendedColumnMeta<TData>)?.isFilterable ? (
                                                      <SelectItem key={column.id} value={column.id}>
                                                            {(column.columnDef.meta as ExtendedColumnMeta<TData>)?.label ?? column.id}
                                                      </SelectItem>
                                                ) : (null)
                                          ))}
                                    </SelectContent>
                              </Select>

                              {columnType === "number" && (
                                    <Select value={numberOperator} onValueChange={handleNumberOperatorChange}>
                                          <SelectTrigger className="w-[140px] h-10">
                                                <SelectValue placeholder="Operator" />
                                          </SelectTrigger>
                                          <SelectContent>
                                                <SelectItem value="eq">=</SelectItem>
                                                <SelectItem value="lt">Less than</SelectItem>
                                                <SelectItem value="gt">Greater than</SelectItem>
                                          </SelectContent>
                                    </Select>
                              )}

                              {
                                   filterColumn !== "" && <Input
                                          placeholder={`Filtrer ${filterColumn === "" ? "" : ((table.getColumn(filterColumn)?.columnDef.meta as ExtendedColumnMeta<TData>)?.label)}...`}
                                          value={filterValue}
                                          onChange={handleFilterChange}
                                          className="max-w-sm  h-10"
                                          type={columnType === "number" ? "number" : "text"}
                                    />
                              }


                        </div>
                        <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="h-10">Colonnes</Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                    {table
                                          .getAllColumns()
                                          .filter((column) => column.getCanHide())
                                          .map((column) => {
                                                return (
                                                      (column.columnDef.meta as ExtendedColumnMeta<TData>)?.label ? (<DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)} >
                                                            {(column.columnDef.meta as ExtendedColumnMeta<TData>)?.label ?? column.id}
                                                      </DropdownMenuCheckboxItem>) : (null)

                                                )
                                          })}
                              </DropdownMenuContent>
                        </DropdownMenu>
                  </div>

                  <div className="rounded-md border w-full">
                        <Table>
                              <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                          <TableRow key={headerGroup.id} className="bg-slate-100">
                                                {headerGroup.headers.map((header) => { return (<TableHead key={header.id}> {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>) })}
                                          </TableRow>
                                    ))}
                              </TableHeader>
                              <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                          table.getRowModel().rows.map((row, index) => (
                                                <TableRow key={row.id} className={index % 2 === 0 ? "bg-slate-50" : undefined} data-state={row.getIsSelected() ? "selected" : undefined} >
                                                      {row.getVisibleCells().map((cell) => (
                                                            <TableCell key={cell.id}> {flexRender(cell.column.columnDef.cell, cell.getContext())} </TableCell>
                                                      ))}
                                                </TableRow>
                                          ))
                                    ) : (
                                          <TableRow>
                                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                                      No results.
                                                </TableCell>
                                          </TableRow>
                                    )}
                              </TableBody>
                        </Table>
                  </div>

                  <DataTablePagination table={table} />

            </div>
      )
}

// TODO : Ensure consistency between displayed column and filtering options