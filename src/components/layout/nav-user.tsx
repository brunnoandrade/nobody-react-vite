import { Link, useNavigate } from '@tanstack/react-router'
import {
  BadgeCheck,
  ChevronsUpDown,
  CreditCard,
  Crown,
  LogOut,
  Settings,
  Sparkles,
} from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import useDialogState from '@/hooks/use-dialog-state'
import { useSubscription, useTrialDaysLeft } from '@/hooks/use-subscription'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { SignOutDialog } from '@/components/sign-out-dialog'

const PLAN_LABELS: Record<string, string> = {
  free_trial: 'Trial',
  starter: 'Básico',
  pro: 'Profissional',
}

export function NavUser() {
  const { isMobile } = useSidebar()
  const [open, setOpen] = useDialogState()
  const navigate = useNavigate()

  const user = useAuthStore((state) => state.auth.user)
  const subscription = useSubscription()
  const trialDaysLeft = useTrialDaysLeft()

  const name = user?.name ?? user?.email?.split('@')[0] ?? 'Usuário'
  const email = user?.email ?? ''
  const initials = name?.[0]?.toUpperCase() ?? 'U'

  const planLabel = subscription
    ? (PLAN_LABELS[subscription.plan] ?? subscription.plan)
    : null

  const isTrial = subscription?.status === 'trial'
  const isActive =
    subscription?.status === 'active' || subscription?.status === 'past_due'
  const isBlocked =
    !subscription ||
    subscription.status === 'expired' ||
    subscription.status === 'canceled'

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage alt={name} />
                  <AvatarFallback className='rounded-lg'>
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className='grid flex-1 text-start text-sm leading-tight'>
                  <span className='truncate font-semibold'>{name}</span>
                  <span className='truncate text-xs'>{email}</span>
                </div>

                <ChevronsUpDown className='ms-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
              side={isMobile ? 'bottom' : 'right'}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-start text-sm'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage alt={name} />
                    <AvatarFallback className='rounded-lg'>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-start text-sm leading-tight'>
                    <span className='truncate font-semibold'>{name}</span>
                    <span className='truncate text-xs text-muted-foreground'>
                      {email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                {isTrial && (
                  <DropdownMenuItem
                    className='cursor-pointer text-orange-600 focus:text-orange-600'
                    onClick={() => navigate({ to: '/plans' })}
                  >
                    <Crown className='text-orange-500' />
                    <div className='flex flex-col'>
                      <span className='text-xs font-semibold'>
                        Fazer upgrade
                      </span>
                      <span className='text-[10px] text-orange-400'>
                        {trialDaysLeft > 0
                          ? `${trialDaysLeft} dias restantes no trial`
                          : 'Trial expirando'}
                      </span>
                    </div>
                  </DropdownMenuItem>
                )}

                {isBlocked && (
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => navigate({ to: '/plans' })}
                  >
                    <Sparkles />
                    Ver planos disponíveis
                  </DropdownMenuItem>
                )}

                {isActive && (
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => navigate({ to: '/settings/billing' })}
                  >
                    <Crown />
                    <div className='flex flex-col'>
                      <span className='text-xs font-semibold'>
                        Plano {planLabel}
                      </span>
                      <span className='text-[10px] text-muted-foreground'>
                        Gerenciar assinatura
                      </span>
                    </div>
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link to='/settings'>
                    <Settings />
                    Configurações
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to='/settings/account'>
                    <BadgeCheck />
                    Conta
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to='/settings/billing'>
                    <CreditCard />
                    Assinatura
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant='destructive'
                onClick={() => setOpen(true)}
              >
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  )
}
