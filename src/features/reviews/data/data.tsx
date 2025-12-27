import { Clock, CheckCircle, XCircle, Star, Package } from 'lucide-react'

export const products = [
  {
    value: 'tenis-runner-pro',
    label: 'Tênis Runner Pro',
    icon: Package,
  },
  {
    value: 'camiseta-dry-fit',
    label: 'Camiseta Dry Fit',
    icon: Package,
  },
  {
    value: 'jaqueta-impermeavel',
    label: 'Jaqueta Impermeável',
    icon: Package,
  },
  {
    value: 'mochila-explorer',
    label: 'Mochila Explorer',
    icon: Package,
  },
]

export const reviewStatuses = [
  {
    label: 'Pendente',
    value: 'pending' as const,
    icon: Clock,
    color: 'text-yellow-600',
  },
  {
    label: 'Aprovado',
    value: 'approved' as const,
    icon: CheckCircle,
    color: 'text-green-600',
  },
  {
    label: 'Rejeitado',
    value: 'rejected' as const,
    icon: XCircle,
    color: 'text-red-600',
  },
]

export const ratings = [
  {
    label: '1 estrela',
    value: 1,
    icon: Star,
  },
  {
    label: '2 estrelas',
    value: 2,
    icon: Star,
  },
  {
    label: '3 estrelas',
    value: 3,
    icon: Star,
  },
  {
    label: '4 estrelas',
    value: 4,
    icon: Star,
  },
  {
    label: '5 estrelas',
    value: 5,
    icon: Star,
  },
]
