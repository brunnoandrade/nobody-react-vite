import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useCurrentStore } from '@/stores/use-current-store'
import { useMe } from '@/features/auth/auth.query'
import { useGetStores } from '@/features/stores/stores.query'

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const accessToken = useAuthStore((state) => state.auth.accessToken)
  const user = useAuthStore((state) => state.auth.user)
  const setUser = useAuthStore((state) => state.auth.setUser)
  const reset = useAuthStore((state) => state.auth.reset)

  const { data, isLoading, isError } = useMe(!!accessToken)

  const { data: stores, isLoading: storesLoading } = useGetStores()
  const { currentStore, setStore } = useCurrentStore()

  useEffect(() => {
    if (data && !user) {
      setUser(data)
    }

    if (isError && user) {
      reset()
    }
  }, [data, isError])

  useEffect(() => {
    if (stores && stores.length > 0 && !currentStore) {
      setStore(stores[0].id)
    }
  }, [stores, currentStore])

  if (accessToken && (isLoading || storesLoading)) {
    return (
      <div className='flex h-screen flex-col items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-6'>
          <div className='text-2xl font-bold tracking-tight'>Minsit</div>
          <Loader2 className='h-6 w-6 animate-spin text-primary' />
        </div>
      </div>
    )
  }

  return <>{children}</>
}
