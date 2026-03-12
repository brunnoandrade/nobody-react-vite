import { createFileRoute } from '@tanstack/react-router'
import { BillingPage } from '@/features/subscriptions/billing-page'

export const Route = createFileRoute('/_authenticated/settings/billing')({
  component: BillingPage,
})
