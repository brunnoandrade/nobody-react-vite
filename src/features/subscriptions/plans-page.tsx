import { useNavigate } from '@tanstack/react-router'
import { Check, Loader2, Zap } from 'lucide-react'
import { useAuthStore } from '@/stores/auth-store'
import { useSubscription } from '@/hooks/use-subscription'
import { Button } from '@/components/ui/button'
import { useActivateTrial, useCreateCheckout } from './subscriptions.mutation'

interface MockPlan {
  slug: string
  planSlug: string
  name: string
  description: string
  price: number
  popular: boolean
  highlightFeature: string
  features: string[]
}

const MOCK_PLANS: MockPlan[] = [
  {
    slug: 'basico',
    planSlug: 'starter',
    name: 'Básico',
    description: 'Para lojas pequenas que estão começando.',
    price: 5500,
    popular: false,
    highlightFeature: 'Até 100 pedidos/mês',
    features: [
      'Avaliações ilimitadas',
      'Estrelas nos produtos',
      'Widget de reviews',
      'Painel admin',
      'Suporte em português',
    ],
  },
  {
    slug: 'profissional',
    planSlug: 'pro',
    name: 'Profissional',
    description: 'Para lojas que já estão crescendo.',
    price: 9800,
    popular: true,
    highlightFeature: 'Até 500 pedidos/mês',
    features: [
      'Tudo do plano Básico +',
      'Fotos nas avaliações',
      'Perguntas e respostas',
      'Respostas do lojista',
      'Filtros de reviews',
      'Coleta automática por email',
    ],
  },
]

const COMMON_FEATURES = [
  'Instalação em 5 minutos',
  'Sem contrato de fidelidade',
  'Cancele quando quiser',
  'Dados 100% seus',
  'Suporte em português',
  'Atualizações gratuitas',
]

function formatPrice(cents: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function PlanCard({ plan, isTrial }: { plan: MockPlan; isTrial: boolean }) {
  const navigate = useNavigate()
  const { mutate: activateTrial, isPending: isActivating } = useActivateTrial()
  const { mutate: checkout, isPending: isCheckingOut } = useCreateCheckout()
  const isPending = isActivating || isCheckingOut

  function handleClick() {
    if (isTrial) {
      activateTrial(undefined, { onSuccess: () => navigate({ to: '/' }) })
    } else {
      checkout(plan.planSlug)
    }
  }

  if (plan.popular) {
    return (
      <div className='flex h-full flex-col rounded-2xl bg-orange-500 p-[2px] shadow-[0_8px_40px_rgba(249,115,22,0.35)]'>
        <div className='flex h-full flex-1 flex-col rounded-[14px] bg-white'>
          <div className='flex items-center justify-between rounded-t-[14px] bg-orange-500 px-6 py-2.5'>
            <span className='text-xs font-bold tracking-widest text-white uppercase'>
              ★ Mais popular
            </span>
            <span className='rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white'>
              Recomendado
            </span>
          </div>

          <div className='flex flex-1 flex-col p-7'>
            <div>
              <p className='text-lg font-bold text-gray-900'>{plan.name}</p>
              <p className='mt-0.5 text-sm text-gray-500'>{plan.description}</p>
            </div>

            <div className='mt-5 flex items-end gap-1'>
              <span className='text-[52px] leading-none font-extrabold tracking-tight text-gray-900'>
                {formatPrice(plan.price)}
              </span>
              <span className='mb-2 text-sm text-gray-400'>/mês</span>
            </div>
            <p className='mt-1 text-xs font-medium text-orange-500'>
              {plan.highlightFeature}
            </p>

            <Button
              size='lg'
              className='mt-6 w-full rounded-xl bg-orange-500 py-6 text-base font-bold text-white shadow-md hover:bg-orange-600 active:scale-[0.98]'
              onClick={handleClick}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className='h-5 w-5 animate-spin' />
              ) : isTrial ? (
                <>
                  <Zap className='mr-2 h-5 w-5' />
                  Começar teste grátis
                </>
              ) : (
                'Assinar agora'
              )}
            </Button>

            {isTrial && (
              <p className='mt-2.5 text-center text-xs text-gray-400'>
                14 dias grátis · Sem cartão · Cancele quando quiser
              </p>
            )}

            <div className='my-6 h-px bg-gray-100' />

            <ul className='space-y-3.5'>
              {plan.features.map((f) => (
                <li
                  key={f}
                  className='flex items-center gap-3 text-sm text-gray-700'
                >
                  <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100'>
                    <Check
                      className='h-3 w-3 text-orange-500'
                      strokeWidth={3}
                    />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm'>
      <div className='flex flex-1 flex-col p-7'>
        <div>
          <p className='text-lg font-bold text-gray-900'>{plan.name}</p>
          <p className='mt-0.5 text-sm text-gray-500'>{plan.description}</p>
        </div>

        <div className='mt-5 flex items-end gap-1'>
          <span className='text-[52px] leading-none font-extrabold tracking-tight text-gray-900'>
            {formatPrice(plan.price)}
          </span>
          <span className='mb-2 text-sm text-gray-400'>/mês</span>
        </div>
        <p className='mt-1 text-xs font-medium text-gray-400'>
          {plan.highlightFeature}
        </p>

        <Button
          size='lg'
          variant='outline'
          className='mt-6 w-full rounded-xl py-6 text-base font-semibold active:scale-[0.98]'
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className='h-5 w-5 animate-spin' />
          ) : isTrial ? (
            'Começar teste grátis'
          ) : (
            'Assinar agora'
          )}
        </Button>

        {isTrial && (
          <p className='mt-2.5 text-center text-xs text-gray-400'>
            14 dias grátis · Sem cartão
          </p>
        )}

        <div className='my-6 h-px bg-gray-100' />

        <ul className='space-y-3.5'>
          {plan.features.map((f) => (
            <li
              key={f}
              className='flex items-center gap-3 text-sm text-gray-500'
            >
              <Check
                className='h-4 w-4 shrink-0 text-gray-300'
                strokeWidth={2.5}
              />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function PlansPage() {
  const subscription = useSubscription()
  const user = useAuthStore((s) => s.auth.user)

  const isExpired = subscription?.status === 'expired'
  const isCanceled = subscription?.status === 'canceled'
  const showTrialCta = !subscription || isExpired || isCanceled
  const isUpgradeFlow = subscription?.status === 'trial'

  return (
    <div className='min-h-screen w-full bg-[#fafafa]'>
      <div className='mx-auto max-w-3xl px-4 py-14 md:py-20'>
        {(isExpired || isCanceled) && (
          <div className='mb-8 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600'>
            {isExpired
              ? '⚠ Seu período de teste expirou. Assine para continuar com acesso.'
              : '⚠ Sua assinatura foi cancelada. Reative para ter acesso novamente.'}
          </div>
        )}

        {isUpgradeFlow && (
          <div className='mb-8 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-center text-sm text-orange-700'>
            Você está no período de trial. Faça upgrade agora para garantir o
            acesso.
          </div>
        )}

        <div className='mb-12 text-center'>
          <p className='mb-3 text-xs font-bold tracking-[0.2em] text-orange-500 uppercase'>
            Planos & Preços
          </p>
          <h1 className='text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl'>
            {showTrialCta ? 'Comece grátis por 14 dias' : 'Escolha seu plano'}
          </h1>
          <p className='mt-3 text-base text-gray-500'>
            {showTrialCta
              ? 'Sem cartão de crédito. Cancele quando quiser. Suporte em português.'
              : 'Faça upgrade e desbloqueie todos os recursos.'}
          </p>

          {user && (
            <div className='mt-6 inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm'>
              <span className='flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600'>
                {user.name?.charAt(0).toUpperCase()}
              </span>
              <span className='text-sm text-gray-700'>{user.name}</span>
              <span className='text-sm text-gray-400'>·</span>
              <span className='text-sm text-gray-500'>{user.email}</span>
            </div>
          )}
        </div>

        <div className='grid grid-cols-1 items-stretch gap-5 md:grid-cols-2'>
          {MOCK_PLANS.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} isTrial={showTrialCta} />
          ))}
        </div>

        <div className='mt-10 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm'>
          <p className='mb-5 text-center text-sm font-semibold text-gray-800'>
            Todos os planos incluem
          </p>
          <div className='grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3'>
            {COMMON_FEATURES.map((f) => (
              <div
                key={f}
                className='flex items-center gap-2 text-sm text-gray-500'
              >
                <Check
                  className='h-4 w-4 shrink-0 text-orange-400'
                  strokeWidth={2.5}
                />
                {f}
              </div>
            ))}
          </div>
        </div>

        <div className='mt-7 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400'>
          <span className='flex items-center gap-1.5'>
            <span className='text-green-500'>🔒</span>
            Pagamento seguro via Stripe
          </span>
          <span className='flex items-center gap-1.5'>
            <Check className='h-3.5 w-3.5 text-green-500' />
            Sem contrato de fidelidade
          </span>
          <span className='flex items-center gap-1.5'>
            <Check className='h-3.5 w-3.5 text-green-500' />
            Suporte em português
          </span>
        </div>
      </div>
    </div>
  )
}
