import { useState } from 'react'
import clsx from 'clsx'
import { Crown, ChevronRight, X } from 'lucide-react'

type FreeTrialFloatingModalProps = {
  daysLeft: number
  onSubscribe?: () => void
}

export function FreeTrialFloatingModal({
  daysLeft,
  onSubscribe,
}: FreeTrialFloatingModalProps) {
  const [minimized, setMinimized] = useState(true)

  return (
    <div className='fixed right-6 bottom-6 z-[9999]'>
      {minimized && (
        <button
          onClick={() => setMinimized(false)}
          className='flex items-center gap-2 rounded-full border border-white/10 bg-[#0B0F1A] px-6 py-3 text-xs text-yellow-300 shadow-lg hover:bg-[#141833]'
        >
          <Crown className='h-4 w-4 text-yellow-300' />
          <span>{daysLeft} dias grátis</span>
        </button>
      )}
      {!minimized && (
        <div className='w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#0B0F1A] to-[#120D2E] shadow-2xl'>
          <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,70,255,0.22),_transparent_60%)]' />
          <div className='relative flex items-center justify-between px-4 pt-4'>
            <div className='flex items-center gap-2 text-xs text-yellow-300'>
              <Crown className='h-4 w-4' />
              <span>
                <strong>{daysLeft}</strong> dias restantes
              </span>
            </div>

            <button
              onClick={() => setMinimized(true)}
              className='rounded-md p-1 text-muted-foreground transition hover:bg-white/10 hover:text-white'
              aria-label='Ocultar'
            >
              <X className='h-4 w-4' />
            </button>
          </div>

          <div className='relative px-6 py-6 text-center'>
            <h3 className='text-lg font-semibold text-white'>
              Desbloqueie o plano premium
            </h3>

            <p className='mt-1 text-sm text-muted-foreground'>
              Acesso completo aos recursos avançados.
            </p>

            <button
              onClick={onSubscribe}
              className={clsx(
                'mt-5 inline-flex items-center justify-center gap-2',
                'rounded-full bg-white px-5 py-2 pr-3 text-sm font-semibold text-black',
                'transition hover:bg-white/90'
              )}
            >
              Selecionar plano
              <ChevronRight className='h-4 w-4' />
            </button>

            <p className='mt-4 flex items-center justify-center gap-1 text-xs text-muted-foreground'>
              <span>Precisa de ajuda?</span>
              <a
                href='#'
                className='text-primary underline-offset-4 hover:underline'
              >
                Falar com especialista
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
