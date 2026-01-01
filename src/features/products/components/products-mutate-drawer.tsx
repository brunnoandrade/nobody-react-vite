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
import { type Product } from '../data/schema'

type ProductsDetailsDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

export function ProductsDetailsDrawer({
  open,
  onOpenChange,
  product,
}: ProductsDetailsDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col sm:max-w-md'>
        <SheetHeader className='text-start'>
          <SheetTitle>Produto</SheetTitle>
          <SheetDescription>
            Detalhes completos do produto cadastrado.
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 space-y-4 overflow-y-auto px-4 py-4'>
          <div>
            <span className='text-sm text-muted-foreground'>Nome</span>
            <p className='font-medium'>{product.name}</p>
          </div>

          <div>
            <span className='text-sm text-muted-foreground'>SKU</span>
            <p className='font-medium'>{product.sku}</p>
          </div>

          <div>
            <span className='text-sm text-muted-foreground'>Preço</span>
            <p className='font-medium'>
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>

          <div>
            <span className='text-sm text-muted-foreground'>Status</span>
            <div className='mt-1'>
              <Badge variant={product.active ? 'default' : 'outline'}>
                {product.active ? 'Ativo' : 'Inativo'}
              </Badge>
            </div>
          </div>

          <Separator />

          <div>
            <span className='text-sm text-muted-foreground'>Criado em</span>
            <p className='text-sm'>
              {product.createdAt.toLocaleDateString('pt-BR')}
            </p>
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
