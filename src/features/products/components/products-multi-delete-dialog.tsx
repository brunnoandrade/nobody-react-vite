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

type ProductsMultiDeleteDialogProps<TData> = {
  open: boolean
  onOpenChange: (open: boolean) => void
  table: Table<TData>
}

const CONFIRM_WORD = 'EXCLUIR'

export function ProductsMultiDeleteDialog<TData>({
  open,
  onOpenChange,
  table,
}: ProductsMultiDeleteDialogProps<TData>) {
  const [value, setValue] = useState('')

  const selectedRows = table.getFilteredSelectedRowModel().rows

  const handleDelete = () => {
    if (value.trim() !== CONFIRM_WORD) {
      toast.error(`Digite "${CONFIRM_WORD}" para confirmar.`)
      return
    }

    onOpenChange(false)

    toast.promise(sleep(2000), {
      loading: 'Excluindo produtos...',
      success: () => {
        setValue('')
        table.resetRowSelection()
        return `Excluído(s) ${selectedRows.length} produto(s).`
      },
      error: 'Erro ao excluir produtos',
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
          {selectedRows.length > 1 ? 'produtos' : 'produto'}
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Tem certeza que deseja excluir os produtos selecionados?
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
              Os produtos excluídos não poderão ser recuperados.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Excluir'
    />
  )
}
