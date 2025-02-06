export interface IAPIResponse<T> {
      success: boolean;
      error?: string;
      data?: T;
}

export interface IActionResponse<T> {
      success: boolean;
      error?: string;
      data?: T;
}

export interface IModel {
      tenantId: string
}

export enum NumberOperator {
      equal = "eq",
      lowerThan = "lt",
      greaterThan = "gt"
}

export interface NumberFilter {
      value: number
      operator: NumberOperator
}