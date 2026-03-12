import { useAuthStore } from '@/stores/auth-store'
import { useCurrentStore } from '@/stores/use-current-store'
import type { Subscription } from '@/features/auth/auth.types'

export function useSubscription(): Subscription | null {
  const user = useAuthStore((state) => state.auth.user)
  const currentStore = useCurrentStore((state) => state.currentStore)

  if (!user?.stores || !currentStore) return null

  const store = user.stores.find((s) => s.id === currentStore)
  return store?.subscription ?? null
}

export function useCurrentStoreRole(): string | null {
  const user = useAuthStore((state) => state.auth.user)
  const currentStore = useCurrentStore((state) => state.currentStore)

  if (!user?.stores || !currentStore) return null

  const store = user.stores.find((s) => s.id === currentStore)
  return store?.role?.slug ?? null
}

export function useHasAccess(): boolean {
  const subscription = useSubscription()
  if (!subscription) return false
  return ['trial', 'active', 'past_due'].includes(subscription.status)
}

export function useTrialDaysLeft(): number {
  const subscription = useSubscription()
  if (
    !subscription ||
    subscription.status !== 'trial' ||
    !subscription.trialEndsAt
  )
    return 0

  const ms = new Date(subscription.trialEndsAt).getTime() - new Date().getTime()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}
