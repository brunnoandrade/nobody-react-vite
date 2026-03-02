import { useState } from 'react'
import { ContentSection } from '../components/content-section'
import { UsersList } from './users-list'
import { useGetUsers } from './users.query'

export function UsersAccount() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

  const { data, isLoading, isError } = useGetUsers({ page, limit })

  return (
    <ContentSection
      title='Usuários da loja'
      desc='Gerencie os usuários vinculados a esta loja. Defina permissões, edite informações e controle os níveis de acesso.'
    >
      <UsersList
        response={
          data ?? {
            data: [],
            totalPages: 0,
            currentPage: page,
            totalItems: 0,
          }
        }
        isLoading={isLoading}
        isError={isError}
        onChangePage={setPage}
        onChangeLimit={setLimit}
      />
    </ContentSection>
  )
}
