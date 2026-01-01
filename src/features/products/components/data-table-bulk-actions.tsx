import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, Power } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DataTableBulkActions as BulkActionsToolbar } from '@/components/data-table'
import { type Product } from '../data/schema'
import { ProductsMultiDeleteDialog } from './products-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedProducts = selectedRows.map((row) => row.original as Product)

  const handleBulkToggleActive = (active: boolean) => {
    toast.promise(sleep(1200), {
      loading: active ? 'Ativando produtos...' : 'Desativando produtos...',
      success: () => {
        table.resetRowSelection()
        return `${selectedProducts.length} produto(s) ${
          active ? 'ativado(s)' : 'desativado(s)'
        } com sucesso.`
      },
      error: 'Erro ao atualizar produtos',
    })
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='produto'>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='size-8'
                  aria-label='Ativar ou desativar produtos'
                  title='Ativar / Desativar produtos'
                >
                  <Power />
                  <span className='sr-only'>Ativar ou desativar produtos</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ativar / Desativar produtos</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent sideOffset={14}>
            <DropdownMenuItem onClick={() => handleBulkToggleActive(true)}>
              Ativar produtos
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleBulkToggleActive(false)}>
              Desativar produtos
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Excluir produtos selecionados'
              title='Excluir produtos selecionados'
            >
              <Trash2 />
              <span className='sr-only'>Excluir produtos</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir produtos</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <ProductsMultiDeleteDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        table={table}
      />
    </>
  )
}
