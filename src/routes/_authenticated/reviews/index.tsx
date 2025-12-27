import z from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import { Reviews } from '@/features/reviews'
import { reviewStatuses } from '@/features/reviews/data/data'

const reviewsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  pageSize: z.number().optional().catch(10),

  status: z
    .array(
      z.enum(
        reviewStatuses.map((status) => status.value) as [string, ...string[]]
      )
    )
    .optional()
    .catch([]),

  rating: z.array(z.number()).optional().catch([]),

  filter: z.string().optional().catch(''),
})

export const Route = createFileRoute('/_authenticated/reviews/')({
  validateSearch: reviewsSearchSchema,
  component: Reviews,
})
