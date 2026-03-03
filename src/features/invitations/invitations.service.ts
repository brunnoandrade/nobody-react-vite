import { api } from '@/lib/api'

export type ValidateInviteResponse = {
  valid: boolean
  email?: string
  hasAccount?: boolean
  storeName?: string
}

export type AcceptInviteDto = {
  code: string
}

export async function validateInvite(code: string) {
  const { data } = await api.get<ValidateInviteResponse>(
    `/invitations/validate/${code}`
  )

  return data
}

export async function acceptInvite(data: AcceptInviteDto) {
  const response = await api.post('/invitations/accept', data)

  return response.data
}
