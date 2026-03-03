import { api } from '@/lib/api'

export type InviteUserDto = {
  email: string
  roleId: number
}

export async function inviteUser(data: InviteUserDto) {
  const response = await api.post('/invitations', data)
  return response.data
}
