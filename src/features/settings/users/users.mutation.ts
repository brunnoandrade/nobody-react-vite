import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser, type UpdateUserDto } from './users.service'

export function useUpdateUser(userId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserDto) => updateUser(userId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}
