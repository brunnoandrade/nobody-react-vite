'use client'

import { useEffect, useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
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
import type { ProductReview } from '../data/data'

type ProductReviewsDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  reviews: ProductReview[]
  onOrderChange?: (ordered: ProductReview[]) => void
}

export function ProductReviewsDrawer({
  open,
  onOpenChange,
  reviews,
  onOrderChange,
}: ProductReviewsDrawerProps) {
  const [items, setItems] = useState<ProductReview[]>([])

  useEffect(() => {
    setItems(reviews)
  }, [reviews])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((i) => i.id === active.id)
    const newIndex = items.findIndex((i) => i.id === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    const reordered = arrayMove(items, oldIndex, newIndex)

    setItems(reordered)
    onOrderChange?.(
      reordered.map((review, index) => ({
        ...review,
        orderIndex: index,
      }))
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-lg'>
        <SheetHeader className='text-start'>
          <SheetTitle>Avaliações do produto</SheetTitle>
          <SheetDescription>
            Arraste para reordenar a exibição das avaliações.
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-y-auto px-4 py-4'>
          {items.length === 0 ? (
            <p className='text-sm text-muted-foreground'>
              Nenhuma avaliação cadastrada para este produto.
            </p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items.map((i) => i.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className='space-y-2'>
                  {items.map((review) => (
                    <SortableReviewCard key={review.id} review={review} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        <Separator />

        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Fechar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

function SortableReviewCard({ review }: { review: ProductReview }) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: review.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'flex gap-3 rounded-md border p-3',
        'bg-background hover:bg-muted/40'
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className='mt-1 cursor-grab text-muted-foreground hover:text-foreground'
        aria-label='Reordenar avaliação'
      >
        <GripVertical size={16} />
      </button>

      <div className='flex-1 space-y-1'>
        <p className='line-clamp-3 text-sm'>{review.comment}</p>

        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
          <span>{review.author}</span>
          <span>•</span>
          <span>{review.createdAt.toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      <Badge variant='outline'>⭐ {review.rating}</Badge>
    </div>
  )
}
