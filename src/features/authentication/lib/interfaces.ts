export interface IAPILoginResponseData {
      id: string,
      name: string,
}

export interface IAPIRegisterResponseData {
      id: string,
      name: string,
}

export interface IAPICurrentResponseData {
      id: string,
      name: string,
      email: string,
      tenantId: string,
}

export interface IUserPreferences {
      tenantId: string
}