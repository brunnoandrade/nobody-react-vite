import { useQuery } from '@tanstack/react-query'
import { getUser, getUsers, type GetUsersResponse } from './users.service'

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

export function useGetUser(userId?: number) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId!),
    enabled: !!userId,
  })
}
