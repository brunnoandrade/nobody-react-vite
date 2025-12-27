import { z } from 'zod'

export const reviewSchema = z.object({
  id: z.string(),
  product: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  author: z.string(),
  status: z.enum(['pending', 'approved', 'rejected']),
  createdAt: z.date(),
})

export type Review = z.infer<typeof reviewSchema>
