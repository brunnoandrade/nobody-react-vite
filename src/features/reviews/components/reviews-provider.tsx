import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { type Review } from '../data/schema'

type ReviewsDialogType =
  | 'details'
  | 'approve'
  | 'reject'
  | 'delete'
  | 'import'
  | 'export'
  | 'filter'
  | 'visibility-author'

type ReviewsContextType = {
  open: ReviewsDialogType | null
  setOpen: (value: ReviewsDialogType | null) => void
  currentRow: Review | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Review | null>>
}

const ReviewsContext = React.createContext<ReviewsContextType | null>(null)

export function ReviewsProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useDialogState<ReviewsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Review | null>(null)

  return (
    <ReviewsContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useReviews = () => {
  const context = React.useContext(ReviewsContext)

  if (!context) {
    throw new Error('useReviews must be used within <ReviewsProvider>')
  }

  return context
}
