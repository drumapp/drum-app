import { NumberFilter, NumberOperator } from "../../../lib/interfaces"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function numberFilterFn(row: any, id: string, filter: NumberFilter) {
      if (!filter?.value) return true
      const rowValue = row.original[id]
      const filterValue = filter.value

      switch (filter.operator) {
            case NumberOperator.equal:
                  return rowValue === filterValue
            case NumberOperator.lowerThan:
                  return rowValue <= filterValue
            case NumberOperator.greaterThan:
                  return rowValue >= filterValue
            default:
                  return true
      }
}

export function formatPrice(amount: number): string {
      return new Intl.NumberFormat(undefined,{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
      }).format(amount);
}


export function parseNumber(value: unknown): number {
      if (typeof value === 'number') {
            return value;
      }
      if (typeof value === 'string') {
            const parsed = parseFloat(value);
            return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function numericSortingFn(rowA: any, rowB: any, columnId: string) {
      const valueA = parseNumber(rowA.original[columnId])
      const valueB = parseNumber(rowB.original[columnId])
      return valueA - valueB
}