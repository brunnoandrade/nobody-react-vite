import { useNavigate } from '@tanstack/react-router'
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  ExternalLink,
  Loader2,
  XCircle,
} from 'lucide-react'
import {
  useSubscription,
  useCurrentStoreRole,
  useTrialDaysLeft,
} from '@/hooks/use-subscription'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  useCancelSubscription,
  useGetPortalUrl,
} from './subscriptions.mutation'

const STATUS_CONFIG = {
  trial: {
    label: 'Trial Ativo',
    icon: Clock,
    variant: 'outline' as const,
    className: 'border-yellow-500 text-yellow-600',
  },
  active: {
    label: 'Ativa',
    icon: CheckCircle2,
    variant: 'outline' as const,
    className: 'border-green-500 text-green-600',
  },
  past_due: {
    label: 'Pagamento em Atraso',
    icon: AlertCircle,
    variant: 'outline' as const,
    className: 'border-orange-500 text-orange-600',
  },
  canceled: {
    label: 'Cancelada',
    icon: XCircle,
    variant: 'outline' as const,
    className: 'border-destructive text-destructive',
  },
  expired: {
    label: 'Expirada',
    icon: XCircle,
    variant: 'destructive' as const,
    className: '',
  },
}

const PLAN_LABELS: Record<string, string> = {
  free_trial: 'Trial Gratuito',
  starter: 'Starter',
  pro: 'Pro',
}

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('pt-BR').format(new Date(iso))
}

export function BillingPage() {
  const navigate = useNavigate()
  const subscription = useSubscription()
  const role = useCurrentStoreRole()
  const trialDaysLeft = useTrialDaysLeft()
  const isAdmin = role === 'admin'

  const { mutate: openPortal, isPending: isOpeningPortal } = useGetPortalUrl()
  const { mutate: cancelSub, isPending: isCanceling } = useCancelSubscription()

  if (!subscription) {
    return (
      <div className='flex w-full flex-col items-center justify-center gap-4 py-16 text-center'>
        <p className='text-muted-foreground'>Nenhuma assinatura encontrada.</p>
        <Button onClick={() => navigate({ to: '/plans' })}>
          Escolher plano
        </Button>
      </div>
    )
  }

  const statusCfg = STATUS_CONFIG[subscription.status]
  const StatusIcon = statusCfg.icon
  const planLabel = PLAN_LABELS[subscription.plan] ?? subscription.plan

  return (
    <div className='w-full space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Assinatura atual</CardTitle>
          <CardDescription>
            Gerencie seu plano e método de pagamento.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Plano</span>
            <span className='font-medium'>{planLabel}</span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-sm text-muted-foreground'>Status</span>
            <Badge
              variant={statusCfg.variant}
              className={`gap-1 ${statusCfg.className}`}
            >
              <StatusIcon className='h-3.5 w-3.5' />
              {statusCfg.label}
            </Badge>
          </div>

          {subscription.status === 'trial' && subscription.trialEndsAt && (
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>
                Trial termina em
              </span>
              <span className='font-medium'>
                {formatDate(subscription.trialEndsAt)}{' '}
                <span className='text-xs text-muted-foreground'>
                  ({trialDaysLeft} dias restantes)
                </span>
              </span>
            </div>
          )}

          {subscription.currentPeriodEnd && (
            <div className='flex items-center justify-between'>
              <span className='text-sm text-muted-foreground'>
                Próxima renovação
              </span>
              <span className='font-medium'>
                {subscription.cancelAtPeriodEnd ? (
                  <span className='text-destructive'>
                    Acesso até {formatDate(subscription.currentPeriodEnd)}
                  </span>
                ) : (
                  formatDate(subscription.currentPeriodEnd)
                )}
              </span>
            </div>
          )}

          {subscription.cancelAtPeriodEnd && (
            <p className='rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive'>
              Cancelamento agendado. O acesso será mantido até o fim do período
              atual.
            </p>
          )}

          <Separator />

          <div className='flex flex-wrap gap-2'>
            {subscription.status === 'trial' && isAdmin && (
              <Button onClick={() => navigate({ to: '/plans' })}>
                Fazer upgrade
              </Button>
            )}

            {['active', 'past_due'].includes(subscription.status) &&
              isAdmin && (
                <Button
                  variant='outline'
                  onClick={() => openPortal(window.location.href)}
                  disabled={isOpeningPortal}
                >
                  {isOpeningPortal ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : (
                    <CreditCard className='mr-2 h-4 w-4' />
                  )}
                  Gerenciar assinatura
                  <ExternalLink className='ml-2 h-3.5 w-3.5' />
                </Button>
              )}

            {['trial', 'active', 'past_due'].includes(subscription.status) &&
              !subscription.cancelAtPeriodEnd &&
              isAdmin && (
                <Button
                  variant='ghost'
                  className='text-destructive hover:text-destructive'
                  onClick={() => cancelSub()}
                  disabled={isCanceling}
                >
                  {isCanceling ? (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  ) : null}
                  Cancelar assinatura
                </Button>
              )}

            {['expired', 'canceled'].includes(subscription.status) &&
              isAdmin && (
                <Button onClick={() => navigate({ to: '/plans' })}>
                  Reativar assinatura
                </Button>
              )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
