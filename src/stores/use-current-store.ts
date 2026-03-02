import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type StoreState = {
  currentStore: number | null
  setStore: (id: number) => void
  clearStore: () => void
}

export const useCurrentStore = create<StoreState>()(
  persist(
    (set) => ({
      currentStore: null,
      setStore: (id) => set({ currentStore: id }),
      clearStore: () => set({ currentStore: null }),
    }),
    {
      name: 'current-store',
    }
  )
)
