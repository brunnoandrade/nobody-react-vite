import { api } from '@/lib/api'
import {
  type SignInDTO,
  type SignInResponse,
  type SignUpDTO,
  type SignUpResponse,
} from './auth.types'

export async function signIn(data: SignInDTO) {
  const response = await api.post<SignInResponse>('/auth/signin', data)
  return response.data
}

export async function signUp(data: SignUpDTO): Promise<SignUpResponse> {
  const response = await api.post<SignUpResponse>('/auth/signup', data)
  return response.data
}
