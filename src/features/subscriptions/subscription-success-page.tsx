import { useNavigate } from '@tanstack/react-router'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SubscriptionSuccessPage() {
  const navigate = useNavigate()

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 text-center'>
      <CheckCircle className='h-16 w-16 text-green-500' />
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold'>Plano ativado com sucesso!</h1>
        <p className='text-muted-foreground'>
          Seu plano foi ativado. Aproveite todos os recursos disponíveis.
        </p>
      </div>
      <Button onClick={() => navigate({ to: '/' })}>Ir para o início</Button>
    </div>
  )
}
