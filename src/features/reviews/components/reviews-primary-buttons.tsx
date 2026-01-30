import { Plus, MailPlus, Download, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useReviews } from './reviews-provider'

export function ReviewsPrimaryButtons() {
  const { setOpen } = useReviews()

  return (
    <div className='flex justify-end'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='gap-2'>
            <MoreVertical size={16} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end' className='w-56'>
          <DropdownMenuItem
            onClick={() => setOpen('import')}
            className='cursor-pointer'
          >
            <Download className='mr-2 h-4 w-4' />
            <span>Importar reviews</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setOpen('send-invite')}
            className='cursor-pointer'
          >
            <MailPlus className='mr-2 h-4 w-4' />
            <span>Enviar pedido de avaliação</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpen('add')}
            className='cursor-pointer font-medium'
          >
            <Plus className='mr-2 h-4 w-4' />
            <span>Adicionar review</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
