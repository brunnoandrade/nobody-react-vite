import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReviews } from './reviews-provider'

export function ReviewsPrimaryButtons() {
  const { setOpen } = useReviews()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Adicionar Review</span> <Plus size={18} />
      </Button>
    </div>
  )
}
