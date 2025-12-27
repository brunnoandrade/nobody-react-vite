import { faker } from '@faker-js/faker'

// Fixed seed for consistent mock data
faker.seed(2025)

export const reviews = Array.from({ length: 100 }, () => {
  const statuses = ['pending', 'approved', 'rejected'] as const

  const products = [
    'Tênis Runner Pro',
    'Camiseta Dry Fit',
    'Jaqueta Impermeável',
    'Mochila Explorer',
  ] as const

  return {
    id: faker.string.uuid(),
    product: faker.helpers.arrayElement(products),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.text(),
    author: faker.person.fullName(),
    status: faker.helpers.arrayElement(statuses),
    createdAt: faker.date.recent({ days: 30 }),
  }
})
