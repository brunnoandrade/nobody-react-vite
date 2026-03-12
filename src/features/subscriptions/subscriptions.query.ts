import { useQuery } from '@tanstack/react-query'
import { getPlans } from './subscriptions.service'

export function useGetPlans() {
  return useQuery({
    queryKey: ['subscription-plans'],
    queryFn: getPlans,
    staleTime: 5 * 60 * 1000,
  })
}
