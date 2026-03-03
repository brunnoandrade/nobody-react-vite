import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { acceptInvite, type AcceptInviteDto } from './invitations.service'

export function useAcceptInvite() {
  return useMutation({
    mutationFn: (data: AcceptInviteDto) => acceptInvite(data),

    onSuccess: () => {
      toast.success('Convite aceito com sucesso!')
    },
  })
}
