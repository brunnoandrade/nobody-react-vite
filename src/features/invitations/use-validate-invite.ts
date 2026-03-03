import { useQuery } from '@tanstack/react-query'
import { validateInvite } from './invitations.service'

export function useValidateInvite(code: string) {
  return useQuery({
    queryKey: ['validate-invite', code],
    queryFn: () => validateInvite(code),
    enabled: !!code,
  })
}
