import { showSubmittedData } from '@/lib/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { ReviewsDetailsDrawer } from './reviews-mutate-drawer'
import { useReviews } from './reviews-provider'

export function ReviewsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useReviews()

  const closeAndReset = () => {
    setOpen(null)
    setTimeout(() => {
      setCurrentRow(null)
    }, 500)
  }

  return (
    <>
      {currentRow && (
        <ReviewsDetailsDrawer
          key={`review-details-${currentRow.id}`}
          open={open === 'details'}
          onOpenChange={() => {
            setOpen('details')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          review={currentRow}
        />
      )}

      {currentRow && (
        <ConfirmDialog
          key={`review-approve-${currentRow.id}`}
          open={open === 'approve'}
          onOpenChange={() => {
            setOpen('approve')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          handleConfirm={() => {
            closeAndReset()
            showSubmittedData(currentRow, 'Avaliação aprovada:')
          }}
          title='Aprovar avaliação?'
          desc={
            <>
              Você está prestes a <strong>aprovar</strong> esta avaliação.
              <br />
              Ela ficará visível para os clientes da loja.
            </>
          }
          confirmText='Aprovar'
          className='max-w-md'
        />
      )}

      {currentRow && (
        <ConfirmDialog
          key={`review-visibility-author-${currentRow.id}`}
          open={open === 'visibility-author'}
          onOpenChange={() => {
            setOpen('visibility-author')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          handleConfirm={() => {
            closeAndReset()
            showSubmittedData(currentRow, 'Visibilidade do autor atualizada:')
          }}
          title='Exibir nome do autor?'
          desc={
            <>
              Você pode escolher se o <strong>nome do autor</strong> desta
              avaliação será exibido publicamente.
              <br />
              <br />
              Caso desative, a avaliação continuará visível, porém de forma
              <strong> anônima</strong>.
            </>
          }
          confirmText='Confirmar'
          className='max-w-md'
        />
      )}

      {currentRow && (
        <ConfirmDialog
          key={`review-reject-${currentRow.id}`}
          destructive
          open={open === 'reject'}
          onOpenChange={() => {
            setOpen('reject')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          handleConfirm={() => {
            closeAndReset()
            showSubmittedData(currentRow, 'Avaliação rejeitada:')
          }}
          title='Rejeitar avaliação?'
          desc={
            <>
              Esta avaliação será <strong>rejeitada</strong> e não ficará
              visível na loja.
              <br />
              Essa ação não poderá ser desfeita.
            </>
          }
          confirmText='Rejeitar'
          className='max-w-md'
        />
      )}

      {currentRow && (
        <ConfirmDialog
          key={`review-delete-${currentRow.id}`}
          destructive
          open={open === 'delete'}
          onOpenChange={() => {
            setOpen('delete')
            setTimeout(() => {
              setCurrentRow(null)
            }, 500)
          }}
          handleConfirm={() => {
            closeAndReset()
            showSubmittedData(currentRow, 'Avaliação excluída:')
          }}
          title='Excluir avaliação?'
          desc={
            <>
              Você está prestes a excluir esta avaliação permanentemente.
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
