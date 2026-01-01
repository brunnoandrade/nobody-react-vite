'use client'

import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Product } from '../data/schema'

export type ProductsDialogType =
  | 'details'
  | 'create'
  | 'edit'
  | 'delete'
  | 'import'
  | 'export'
  | 'filter'
  | 'toggle-active'
  | 'reviews'

type ProductsContextType = {
  open: ProductsDialogType | null
  setOpen: (value: ProductsDialogType | null) => void
  currentRow: Product | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Product | null>>
}

const ProductsContext = React.createContext<ProductsContextType | null>(null)

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ProductsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Product | null>(null)

  return (
    <ProductsContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = React.useContext(ProductsContext)

  if (!context) {
    throw new Error('useProducts must be used within <ProductsProvider>')
  }

  return context
}
