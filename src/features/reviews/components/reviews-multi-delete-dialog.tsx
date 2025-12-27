'use client'

import { useState } from 'react'
import { type Table } from '@tanstack/react-table'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { sleep } from '@/lib/utils'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ConfirmDialog } from '@/components/confirm-dialog'

type ReviewsMultiDeleteDialogProps<TData> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<TData>
}

const CONFIRM_WORD = 'EXCLUIR'

export function ReviewsMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: ReviewsMultiDeleteDialogProps<TData>) {
  const [value, setValue] = useState('')

  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleDelete = () => {
    if (value.trim() !== CONFIRM_WORD) {
      toast.error(`Digite "${CONFIRM_WORD}" para confirmar.`)
      return
    }

    onOpenChange(false)

    toast.promise(sleep(2000), {
      loading: 'Excluindo avaliações...',
      success: () => {
        setValue('')
        table.resetRowSelection()
        return `Excluída(s) ${selectedRows.length} avaliação(ões).`
      },
      error: 'Erro ao excluir avaliações',
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== CONFIRM_WORD}
      destructive
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Excluir {selectedRows.length}{' '}
          {selectedRows.length > 1 ? 'avaliações' : 'avaliação'}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Tem certeza que deseja excluir as avaliações selecionadas?
            <br />
            <strong>Essa ação não pode ser desfeita.</strong>
          </p>

          <Label className='my-4 flex flex-col items-start gap-1.5'>
            <span>Confirme digitando &quot;{CONFIRM_WORD}&quot;:</span>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Digite "${CONFIRM_WORD}" para confirmar`}
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Atenção!</AlertTitle>
            <AlertDescription>
              As avaliações excluídas não poderão ser recuperadas.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Excluir'
    />
  )
}
