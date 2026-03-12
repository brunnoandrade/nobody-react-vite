import { createFileRoute } from '@tanstack/react-router'
import { PlansPage } from '@/features/subscriptions/plans-page'

export const Route = createFileRoute('/_authenticated/plans')({
  component: PlansPage,
})
