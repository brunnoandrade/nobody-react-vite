import { faker } from '@faker-js/faker'
import { products } from './products'

export type ProductReview = {
  id: string
  productId: string
  author: string
  rating: number
  comment: string
  createdAt: Date
  orderIndex: number
}

export const productReviews: ProductReview[] = Array.from(
  { length: 60 },
  (_, index) => ({
    id: faker.string.uuid(),
    productId: faker.helpers.arrayElement(products).id,
    author: faker.person.fullName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.sentences(2),
    createdAt: faker.date.recent({ days: 60 }),
    orderIndex: index,
  })
)

export function getReviewsByProductId(
  productId: string,
  reviews: ProductReview[]
) {
  return reviews
    .filter((r) => r.productId === productId)
    .sort((a, b) => a.orderIndex - b.orderIndex)
}
