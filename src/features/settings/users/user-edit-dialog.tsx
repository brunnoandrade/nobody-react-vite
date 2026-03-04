import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useUpdateUser } from './users.mutation'
import { useGetUser } from './users.query'
import { type UserStore } from './users.service'

type Props = {
  user: UserStore | null
  open: boolean
  onClose: () => void
}

export function UserEditDialog({ user, open, onClose }: Props) {
  const userId = user?.user.id

  const { data, isLoading } = useGetUser(userId)

  const [name, setName] = useState('')

  const mutation = useUpdateUser(userId ?? 0)

  const displayName = name || data?.name || ''

  async function handleSubmit() {
    if (!userId) return

    await mutation.mutateAsync({
      name: displayName,
    })

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className='text-sm text-muted-foreground'>
            Carregando usuário...
          </div>
        ) : (
          <div className='space-y-4'>
            <Input
              value={displayName}
              onChange={(e) => setName(e.target.value)}
              placeholder='Nome'
            />
          </div>
        )}

        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Cancelar
          </Button>

          <Button onClick={handleSubmit} disabled={mutation.isPending}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
