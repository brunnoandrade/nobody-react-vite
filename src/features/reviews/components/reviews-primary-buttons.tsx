import { Plus, MailPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReviews } from './reviews-provider'

export function ReviewsPrimaryButtons() {
  const { setOpen } = useReviews()

  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('send-invite')}
      >
        <span>Enviar pedido de avaliação</span>
        <MailPlus size={18} />
      </Button>

      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Adicionar Review</span>
        <Plus size={18} />
      </Button>
    </div>
  )
}
