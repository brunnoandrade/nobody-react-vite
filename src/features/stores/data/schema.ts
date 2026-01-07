import { z } from 'zod'

export const storeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  document: z.string().optional(),
  isActive: z.boolean().default(true),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Store = z.infer<typeof storeSchema>

export const storeListSchema = z.array(storeSchema)
