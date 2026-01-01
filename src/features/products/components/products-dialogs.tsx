import { showSubmittedData } from '@/lib/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { ProductsDetailsDrawer } from './products-mutate-drawer'
import { useProducts } from './products-provider'

export function ProductsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useProducts()

  const closeAndReset = () => {
    setOpen(null)
    setTimeout(() => {
      setCurrentRow(null)
    }, 300)
  }

  return (
    <>
      {currentRow && (
        <ProductsDetailsDrawer
          key={`product-details-${currentRow.id}`}
          open={open === 'details'}
          onOpenChange={(isOpen) => {
            if (!isOpen) closeAndReset()
          }}
          product={currentRow}
        />
      )}

      {currentRow && (
        <ConfirmDialog
          key={`product-toggle-${currentRow.id}`}
          open={open === 'toggle-active'}
          onOpenChange={(isOpen) => {
            if (!isOpen) closeAndReset()
          }}
          handleConfirm={() => {
            closeAndReset()
            showSubmittedData(
              {
                productId: currentRow.id,
                active: !currentRow.active,
              },
              currentRow.active ? 'Produto desativado:' : 'Produto ativado:'
            )
          }}
          title={currentRow.active ? 'Desativar produto?' : 'Ativar produto?'}
          desc={
            currentRow.active ? (
              <>
                Este produto ficará <strong>inativo</strong> e não estará
                disponível para venda.
              </>
            ) : (
              <>
                Este produto ficará <strong>ativo</strong> e disponível para
                venda.
              </>
            )
          }
          confirmText={currentRow.active ? 'Desativar' : 'Ativar'}
          className='max-w-md'
        />
      )}

      {currentRow && (
        <ConfirmDialog
          key={`product-delete-${currentRow.id}`}
          destructive
          open={open === 'delete'}
          onOpenChange={(isOpen) => {
            if (!isOpen) closeAndReset()
          }}
          handleConfirm={() => {
            closeAndReset()
            showSubmittedData(currentRow, 'Produto excluído:')
          }}
          title='Excluir produto?'
          desc={
            <>
              Você está prestes a excluir este produto permanentemente.
              <br />
              <strong>Essa ação não pode ser desfeita.</strong>
            </>
          }
          confirmText='Excluir'
          className='max-w-md'
        />
      )}
    </>
  )
}
