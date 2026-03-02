import axios from 'axios'
import { useAuthStore } from '@/stores/auth-store'
import { useCurrentStore } from '@/stores/use-current-store'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().auth.accessToken
  const storeId = useCurrentStore.getState().currentStore

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const isStoresRoute = config.url?.includes('/stores')

  if (storeId && !isStoresRoute) {
    config.headers['x-store-id'] = storeId
  }

  return config
})
