import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/auth-store'
import { getStores } from './stores.service'

export function useGetStores() {
  const accessToken = useAuthStore((state) => state.auth.accessToken)

  return useQuery({
    queryKey: ['stores'],
    queryFn: getStores,
    enabled: !!accessToken,
  })
}
