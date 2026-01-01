import { faker } from '@faker-js/faker'

faker.seed(2025)

export type Product = {
  id: string
  name: string
  sku: string
  price: number
  active: boolean
  createdAt: Date
}

export const products: Product[] = Array.from({ length: 20 }, () => ({
  id: faker.string.uuid(),
  name: faker.helpers.arrayElement([
    'Tênis Runner Pro',
    'Camiseta Dry Fit',
    'Jaqueta Impermeável',
    'Mochila Explorer',
  ]),
  sku: faker.string.alphanumeric(8).toUpperCase(),
  price: faker.number.float({ min: 49.9, max: 799.9, fractionDigits: 2 }),
  active: faker.datatype.boolean(),
  createdAt: faker.date.recent({ days: 90 }),
}))
