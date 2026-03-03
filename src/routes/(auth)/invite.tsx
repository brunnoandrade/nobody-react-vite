import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { InviteView } from '@/features/invitations/invite-view'

const searchSchema = z.object({
  code: z.string(),
})

export const Route = createFileRoute('/(auth)/invite')({
  component: InviteView,
  validateSearch: searchSchema,
})
