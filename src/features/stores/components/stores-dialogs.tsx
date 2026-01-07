import { StoresActionDialog } from './stores-action-dialog'
import { useStores } from './stores-provider'

export function StoresDialogs() {
  const { open, setOpen } = useStores()
  return (
    <>
      <StoresActionDialog
        key='store-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />
    </>
  )
}
