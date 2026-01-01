import { z } from 'zod'

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string(),
  price: z.number(),
  active: z.boolean(),
  createdAt: z.date(),
})

export type Product = z.infer<typeof productSchema>
