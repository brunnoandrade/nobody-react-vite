import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Route } from '@/routes/(auth)/invite'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useAcceptInvite } from './invitations.mutation'
import { useValidateInvite } from './use-validate-invite'

export function InviteView() {
  const { code } = Route.useSearch()
  const navigate = useNavigate()

  const accessToken = useAuthStore((state) => state.auth.accessToken)

  const { data, isLoading } = useValidateInvite(code)
  const { mutateAsync } = useAcceptInvite()

  useEffect(() => {
    if (!data || isLoading) return

    if (!data.valid) {
      navigate({ to: '/sign-in' })
      return
    }

    if (!accessToken) {
      if (data.hasAccount) {
        navigate({
          to: '/sign-in',
          search: {
            redirect: `/invite?code=${code}`,
          },
        })
      } else {
        navigate({
          to: '/sign-up',
          search: {
            redirect: `/invite?code=${code}`,
            email: data.email,
          },
        })
      }

      return
    }

    async function accept() {
      await mutateAsync({ code })
      navigate({ to: '/', replace: true })
    }

    accept()
  }, [data, accessToken])

  return (
    <div className='flex h-screen items-center justify-center'>
      <Loader2 className='h-6 w-6 animate-spin text-primary' />
    </div>
  )
}
