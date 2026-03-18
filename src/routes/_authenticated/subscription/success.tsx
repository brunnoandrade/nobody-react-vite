import { createFileRoute } from '@tanstack/react-router'
import { SubscriptionSuccessPage } from '@/features/subscriptions/subscription-success-page'

export const Route = createFileRoute('/_authenticated/subscription/success')({
  component: SubscriptionSuccessPage,
})
