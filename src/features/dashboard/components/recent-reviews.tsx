import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export function RecentReviews() {
  return (
    <div className='space-y-8'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/01.png' alt='Avatar' />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>

        <div className='flex flex-1 flex-wrap items-center justify-between gap-2'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Olivia Martin</p>
            <p className='text-xs text-muted-foreground'>
              “Entrega rápida e ótima qualidade.”
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <Badge variant='outline'>⭐ 5</Badge>
            <Badge className='bg-green-600'>Aprovada</Badge>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Avatar className='flex h-9 w-9 items-center justify-center border'>
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>

        <div className='flex flex-1 flex-wrap items-center justify-between gap-2'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium text-muted-foreground italic'>
              Anônimo
            </p>
            <p className='text-xs text-muted-foreground'>
              “O atendimento demorou mais do que o esperado.”
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <Badge variant='outline'>⭐ 3</Badge>
            <Badge variant='secondary'>Pendente</Badge>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/03.png' alt='Avatar' />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>

        <div className='flex flex-1 flex-wrap items-center justify-between gap-2'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Isabella Nguyen</p>
            <p className='text-xs text-muted-foreground'>
              “Produto conforme descrito, recomendo.”
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <Badge variant='outline'>⭐ 4</Badge>
            <Badge className='bg-green-600'>Aprovada</Badge>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/04.png' alt='Avatar' />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>

        <div className='flex flex-1 flex-wrap items-center justify-between gap-2'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>William Kim</p>
            <p className='text-xs text-muted-foreground'>
              “Tive problemas com o pagamento.”
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <Badge variant='outline'>⭐ 2</Badge>
            <Badge variant='destructive'>Rejeitada</Badge>
          </div>
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <Avatar className='h-9 w-9'>
          <AvatarImage src='/avatars/05.png' alt='Avatar' />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>

        <div className='flex flex-1 flex-wrap items-center justify-between gap-2'>
          <div className='space-y-1'>
            <p className='text-sm leading-none font-medium'>Sofia Davis</p>
            <p className='text-xs text-muted-foreground'>
              “Gostei bastante, compraria novamente.”
            </p>
          </div>

          <div className='flex items-center gap-2'>
            <Badge variant='outline'>⭐ 5</Badge>
            <Badge className='bg-green-600'>Aprovada</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
