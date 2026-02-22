import { api } from '@/lib/api'

export interface SignInDTO {
  email: string
  password: string
}

export interface SignInResponse {
  access_token: string
  refresh_token: string
  storeId: number[]
}

export async function signIn(data: SignInDTO) {
  const response = await api.post<SignInResponse>('/auth/signin', data)

  return response.data
}
