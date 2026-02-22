import { useQuery } from '@tanstack/react-query'
import { getMe } from './auth.service'

export function useMe(enabled: boolean) {
  return useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled,
    retry: false,
  })
}
