import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { getMe } from '@/features/auth/auth.service'
import {
  activateTrial,
  cancelSubscription,
  createCheckout,
  getPortalUrl,
} from './subscriptions.service'

async function refreshUser() {
  const data = await getMe()
  useAuthStore.getState().auth.setUser(data)
  return data
}

export function useActivateTrial() {
  return useMutation({
    mutationFn: activateTrial,
    onSuccess: async () => {
      await refreshUser()
      toast.success('Trial ativado com sucesso!')
      window.location.href = '/'
    },
  })
}

export function useCreateCheckout() {
  return useMutation({
    mutationFn: (planSlug: string) => createCheckout(planSlug),
    onSuccess: ({ url }) => {
      window.location.href = url
    },
  })
}

export function useCancelSubscription() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cancelSubscription,
    onSuccess: async () => {
      await refreshUser()
      queryClient.invalidateQueries({ queryKey: ['me'] })
      toast.success(
        'Assinatura cancelada. O acesso continua até o fim do período.'
      )
    },
  })
}

export function useGetPortalUrl() {
  return useMutation({
    mutationFn: (returnUrl: string) => getPortalUrl(returnUrl),
    onSuccess: ({ url }) => {
      window.location.href = url
    },
  })
}
