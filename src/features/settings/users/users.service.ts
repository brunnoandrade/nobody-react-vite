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

export type UpdateUserDto = {
  name: string
}

export async function getUsers(params?: GetUsersParams) {
  const { data } = await api.get<GetUsersResponse>('/users', {
    params,
  })

  return data
}

export async function getUser(userId: number) {
  const { data } = await api.get(`/users/${userId}`)
  return data
}

export async function updateUser(userId: number, data: UpdateUserDto) {
  const response = await api.patch(`/users/${userId}`, data)
  return response.data
}

export async function deleteUser(userId: number) {
  const response = await api.delete(`/users/${userId}`)
  return response.data
}
