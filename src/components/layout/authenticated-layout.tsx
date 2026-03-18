import { useEffect } from 'react'
import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { useAuthStore } from '@/stores/auth-store'
import { getCookie } from '@/lib/cookies'
import { cn } from '@/lib/utils'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'
import { useSubscription, useTrialDaysLeft } from '@/hooks/use-subscription'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SkipToMain } from '@/components/skip-to-main'
import { FreeTrialFloatingModal } from '../free-trial-floating-modal'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

const SUBSCRIPTION_BYPASS_PATHS = ['/plans', '/subscription/success']

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  const navigate = useNavigate()
  const { location } = useRouterState()

  const user = useAuthStore((state) => state.auth.user)
  const subscription = useSubscription()
  const trialDaysLeft = useTrialDaysLeft()

  const isBypassRoute = SUBSCRIPTION_BYPASS_PATHS.includes(location.pathname)

  const isTrialExpired =
    subscription?.status === 'trial' &&
    !!subscription.trialEndsAt &&
    new Date(subscription.trialEndsAt) < new Date()

  const isExpired =
    !!user &&
    (!subscription ||
      subscription.status === 'expired' ||
      subscription.status === 'canceled' ||
      isTrialExpired)

  const showTrialModal =
    !isExpired && subscription?.status === 'trial' && !isBypassRoute

  useEffect(() => {
    if (isExpired && !isBypassRoute) {
      navigate({ to: '/plans' })
    }
  }, [isExpired, isBypassRoute, navigate])

  return (
    <SearchProvider>
      <LayoutProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <SkipToMain />
          <AppSidebar />
          {showTrialModal && (
            <FreeTrialFloatingModal
              daysLeft={trialDaysLeft}
              onSubscribe={() => navigate({ to: '/plans' })}
            />
          )}
          <SidebarInset
            className={cn(
              '@container/content',
              'has-data-[layout=fixed]:h-svh',
              'peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]'
            )}
          >
            {children ?? <Outlet />}
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  )
}
