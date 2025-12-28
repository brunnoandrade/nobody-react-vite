import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ReviewsDialogs } from './components/reviews-dialogs'
import { ReviewsProvider } from './components/reviews-provider'
import { ReviewsTable } from './components/reviews-table'
import { reviews } from './data/reviews'

export function Reviews() {
  const [autoApprove, setAutoApprove] = useState(false)

  return (
    <ReviewsProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Avaliações</h2>
            <p className='text-muted-foreground'>
              Visualize e gerencie todas as avaliações recebidas na sua loja
            </p>
          </div>

          <div className='flex items-center gap-3 rounded-lg border px-4 py-2'>
            <div className='flex flex-col'>
              <Label htmlFor='auto-approve' className='text-sm font-medium'>
                Aprovação automática
              </Label>
            </div>

            <Switch
              id='auto-approve'
              checked={autoApprove}
              onCheckedChange={setAutoApprove}
              aria-label='Ativar aprovação automática de avaliações'
            />
          </div>
        </div>

        <ReviewsTable data={reviews} />
      </Main>

      <ReviewsDialogs />
    </ReviewsProvider>
  )
}
