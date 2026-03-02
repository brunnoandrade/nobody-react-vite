import { useQuery } from '@tanstack/react-query'
import { getUsers, type GetUsersResponse } from './users.service'

type UseGetUsersParams = {
  page?: number
  limit?: number
}

export function useGetUsers(params?: UseGetUsersParams) {
  return useQuery<GetUsersResponse>({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  })
}
