import { api } from '@/lib/api'

export type Store = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export async function getStores() {
  const { data } = await api.get<Store[]>('/stores')
  return data
}
