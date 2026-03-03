import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { inviteUser, type InviteUserDto } from './invitations.service'

export function useInviteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: InviteUserDto) => inviteUser(data),

    onSuccess: () => {
      toast.success('Convite enviado com sucesso.')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
