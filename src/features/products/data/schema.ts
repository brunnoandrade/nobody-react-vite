import { z } from 'zod'

export const productReviewSchema = z.object({
  id: z.string(),
  productId: z.string(),
  author: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  createdAt: z.date(),
  orderIndex: z.number(),
})

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  price: z.number(),
  active: z.boolean(),
  createdAt: z.date(),
  reviews: z.array(productReviewSchema).optional(),
})

export type Product = z.infer<typeof productSchema>
export type ProductReview = z.infer<typeof productReviewSchema>
