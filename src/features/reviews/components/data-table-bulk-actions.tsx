import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { Trash2, CircleCheck } from 'lucide-react'
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
import { reviewStatuses } from '../data/data'
import { type Review } from '../data/schema'
import { ReviewsMultiDeleteDialog } from './reviews-multi-delete-dialog'

type DataTableBulkActionsProps<TData> = {
  table: Table<TData>
}

export function DataTableBulkActions<TData>({
  table,
}: DataTableBulkActionsProps<TData>) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedReviews = selectedRows.map((row) => row.original as Review)

  const handleBulkStatusChange = (status: Review['status']) => {
    toast.promise(sleep(1500), {
      loading: 'Atualizando status...',
      success: () => {
        table.resetRowSelection()
        return `${selectedReviews.length} avaliação(ões) marcadas como "${status}".`
      },
      error: 'Erro ao atualizar status',
    })
  }

  return (
    <>
      <BulkActionsToolbar table={table} entityName='avaliação'>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  size='icon'
                  className='size-8'
                  aria-label='Atualizar status'
                  title='Atualizar status'
                >
                  <CircleCheck />
                  <span className='sr-only'>Atualizar status</span>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Atualizar status</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent sideOffset={14}>
            {reviewStatuses.map((status) => (
              <DropdownMenuItem
                key={status.value}
                onClick={() => handleBulkStatusChange(status.value)}
              >
                <status.icon className='mr-2 size-4 text-muted-foreground' />
                {status.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='destructive'
              size='icon'
              onClick={() => setShowDeleteConfirm(true)}
              className='size-8'
              aria-label='Excluir avaliações selecionadas'
              title='Excluir avaliações selecionadas'
            >
              <Trash2 />
              <span className='sr-only'>Excluir avaliações</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir avaliações</p>
          </TooltipContent>
        </Tooltip>
      </BulkActionsToolbar>

      <ReviewsMultiDeleteDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        table={table}
      />
    </>
  )
}
