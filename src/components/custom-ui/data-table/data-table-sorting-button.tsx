"use client"
import { Button } from "@/components/ui/button"
import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp } from "lucide-react"

interface ISortingButton<T> {
      column: Column<T>,
      headerText: string
}

export const SortingButton = <T,>({ column, headerText }: ISortingButton<T>) => {

      const handleClick = () => {
            const isSorted = column.getIsSorted()
            if (isSorted === false) { column.toggleSorting(false) }
            if (isSorted === "asc") { column.toggleSorting(true) }
            if (isSorted === "desc") { column.clearSorting() }
      }

      const Icon = () => {
            const isSorted = column.getIsSorted()
            switch (isSorted) {
                  case false: return null 
                  case "asc": return <ArrowUp />
                  case "desc": return <ArrowDown />
            }
      }

      return (
            <Button className="font-extrabold hover:bg-transparent pl-0" variant="ghost" onClick={handleClick}> {headerText} {<Icon />}</Button>
      )
}