import { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { GetUsersResponse } from './users.service'

type Props = {
  response: GetUsersResponse
  isLoading?: boolean
  isError?: boolean
  onChangePage?: (page: number) => void
  onChangeLimit?: (limit: number) => void
}

export function UsersList({ response, isLoading, isError }: Props) {
  const users = useMemo(() => response.data ?? [], [response])

  if (isLoading) {
    return (
      <div className='p-6 text-muted-foreground'>Carregando usuários...</div>
    )
  }

  if (isError) {
    return <div className='p-6 text-red-500'>Erro ao carregar usuários.</div>
  }

  if (!users.length) {
    return (
      <div className='p-6 text-muted-foreground'>
        Nenhum usuário encontrado.
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      {users.map((item) => (
        <Card key={item.id}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0'>
            <div>
              <CardTitle className='text-base'>{item.user.name}</CardTitle>
              <p className='text-sm text-muted-foreground'>{item.user.email}</p>
            </div>

            <Badge
              variant={item.role.slug === 'admin' ? 'default' : 'secondary'}
            >
              {item.role.name}
            </Badge>
          </CardHeader>

          <CardContent className='space-y-2 text-sm'>
            <div className='flex flex-wrap gap-4 text-muted-foreground'>
              <span>
                📅 Criado em:{' '}
                {new Date(item.createdAt).toLocaleDateString('pt-BR')}
              </span>

              {item.user.language && (
                <span>🌎 Idioma: {item.user.language}</span>
              )}

              {item.user.state && <span>📍 Estado: {item.user.state}</span>}
            </div>

            <div className='flex justify-end gap-2 pt-2'>
              <Button size='sm' variant='outline'>
                Editar
              </Button>
              <Button size='sm' variant='destructive'>
                Remover
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className='flex justify-between pt-4 text-sm text-muted-foreground'>
        <span>
          Página {response.currentPage} de {response.totalPages}
        </span>
        <span>Total de usuários: {response.totalItems}</span>
      </div>
    </div>
  )
}
