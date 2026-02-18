import { faker } from '@faker-js/faker'
import { type Review } from './schema'

faker.seed(2025)

export const reviews: Review[] = Array.from({ length: 100 }, () => {
  const statuses: Review['status'][] = ['pending', 'approved', 'rejected']

  const createdBys: Review['createdBy'][] = ['admin', 'customer', 'import']

  const products = [
    'Tênis Runner Pro',
    'Camiseta Dry Fit',
    'Jaqueta Impermeável',
    'Mochila Explorer',
  ]

  return {
    id: faker.string.uuid(),
    product: faker.helpers.arrayElement(products),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.text(),
    author: faker.person.fullName(),
    showAuthor: faker.datatype.boolean(),
    status: faker.helpers.arrayElement(statuses),
    createdBy: faker.helpers.arrayElement(createdBys),
    createdAt: faker.date.recent({ days: 30 }),
  }
})
