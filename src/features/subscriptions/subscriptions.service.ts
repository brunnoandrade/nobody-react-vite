import { api } from '@/lib/api'
import type { Subscription } from '@/features/auth/auth.types'

export interface Plan {
  slug: string
  name: string
  description: string
  price: number
}

export interface CheckoutResponse {
  url: string
}

export interface PortalResponse {
  url: string
}

export async function getPlans(): Promise<Plan[]> {
  const { data } = await api.get<Plan[]>('/subscriptions/plans')
  return data
}

export async function getCurrentSubscription(): Promise<Subscription> {
  const { data } = await api.get<Subscription>('/subscriptions/current')
  return data
}

export async function activateTrial(): Promise<Subscription> {
  const { data } = await api.post<Subscription>('/subscriptions/trial')
  return data
}

export async function createCheckout(
  planSlug: string
): Promise<CheckoutResponse> {
  const { data } = await api.post<CheckoutResponse>('/subscriptions/checkout', {
    planSlug,
  })
  return data
}

export async function cancelSubscription(): Promise<void> {
  await api.post('/subscriptions/cancel')
}

export async function getPortalUrl(returnUrl: string): Promise<PortalResponse> {
  const { data } = await api.get<PortalResponse>('/subscriptions/portal', {
    params: { returnUrl },
  })
  return data
}
