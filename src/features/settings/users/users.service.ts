import { api } from '@/lib/api'

export type Role = {
  id: number
  name: string
  slug: string
}

export type User = {
  id: number
  name: string
  email: string
  documentId: string | null
  phone: string | null
  state: string | null
  language: string | null
}

export type UserStore = {
  id: number
  createdAt: string
  updatedAt: string
  role: Role
  user: User
  store: number
}

export type GetUsersResponse = {
  data: UserStore[]
  totalPages: number
  currentPage: number
  totalItems: number
}

type GetUsersParams = {
  page?: number
  limit?: number
}

export async function getUsers(params?: GetUsersParams) {
  const { data } = await api.get<GetUsersResponse>('/users', {
    params,
  })

  return data
}
