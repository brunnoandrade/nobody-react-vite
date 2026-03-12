import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { getCookie } from '@/lib/cookies'
import { cn } from '@/lib/utils'
import { LayoutProvider } from '@/context/layout-provider'
import { SearchProvider } from '@/context/search-provider'
import { useSubscription, useTrialDaysLeft } from '@/hooks/use-subscription'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { SkipToMain } from '@/components/skip-to-main'
import { PlansPage } from '@/features/subscriptions/plans-page'
import { FreeTrialFloatingModal } from '../free-trial-floating-modal'

type AuthenticatedLayoutProps = {
  children?: React.ReactNode
}

const SUBSCRIPTION_BYPASS_PATHS = ['/plans']

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  const defaultOpen = getCookie('sidebar_state') !== 'false'
  const navigate = useNavigate()
  const { location } = useRouterState()

  const subscription = useSubscription()
  const trialDaysLeft = useTrialDaysLeft()

  const isBlocked =
    !subscription ||
    subscription.status === 'expired' ||
    subscription.status === 'canceled'

  const isBypassRoute = SUBSCRIPTION_BYPASS_PATHS.includes(location.pathname)

  const showTrialModal =
    !isBlocked && subscription?.status === 'trial' && !isBypassRoute

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
            {isBlocked && !isBypassRoute ? (
              <PlansPage />
            ) : (
              (children ?? <Outlet />)
            )}
          </SidebarInset>
        </SidebarProvider>
      </LayoutProvider>
    </SearchProvider>
  )
}
