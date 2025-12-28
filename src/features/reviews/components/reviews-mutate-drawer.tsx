'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { reviewStatuses } from '../data/data'
import { type Review } from '../data/schema'

type ReviewsDetailsDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  review: Review
}

export function ReviewsDetailsDrawer({
  open,
  onOpenChange,
  review,
}: ReviewsDetailsDrawerProps) {
  const status = reviewStatuses.find((s) => s.value === review.status)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-md'>
        <SheetHeader className='text-start'>
          <SheetTitle>Avaliação</SheetTitle>
          <SheetDescription>
            Detalhes completos da avaliação enviada pelo cliente.
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 space-y-4 overflow-y-auto px-4 py-4'>
          <div>
            <span className='text-sm text-muted-foreground'>Produto</span>
            <p className='font-medium'>{review.product}</p>
          </div>

          <div>
            <span className='text-sm text-muted-foreground'>Autor</span>
            <p className='font-medium'>{review.author}</p>
          </div>

          <div>
            <span className='text-sm text-muted-foreground'>Nota</span>
            <p className='font-medium'>⭐ {review.rating}</p>
          </div>

          {status && (
            <div>
              <span className='text-sm text-muted-foreground'>Status</span>
              <div className='mt-1'>
                <Badge variant='outline'>
                  <status.icon className='mr-1 h-3 w-3' />
                  {status.label}
                </Badge>
              </div>
            </div>
          )}

          <Separator />

          <div>
            <span className='text-sm text-muted-foreground'>Comentário</span>
            <p className='mt-1 text-sm whitespace-pre-line'>{review.comment}</p>
          </div>
        </div>

        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
