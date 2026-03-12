export interface SignInDTO {
  email: string
  password: string
}

export interface SignInResponse {
  access_token: string
  refresh_token: string
  storeId: number[]
}

export interface SignUpDTO {
  email: string
  password: string
  name: string
  store_name: string
}

export interface SignUpResponse {
  access_token: string
  refresh_token: string
}

export type SubscriptionStatus =
  | 'trial'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'expired'

export interface Subscription {
  plan: string
  status: SubscriptionStatus
  trialEndsAt: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
}

export interface StoreInUser {
  id: number
  name: string
  role: { slug: string }
  subscription: Subscription | null
}
