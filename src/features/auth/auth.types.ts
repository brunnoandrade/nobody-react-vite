export interface SignInDTO {
  email: string
  password: string
}

export interface SignInResponse {
  access_token: string
  refresh_token: string
  storeId: number[]
}

export interface SignUpDTO {
  email: string
  password: string
  name: string
  store_name: string
}

export interface SignUpResponse {
  access_token: string
  refresh_token: string
}
