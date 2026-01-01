import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Analytics } from './components/analytics'
import { Overview } from './components/overview'
import { RecentReviews } from './components/recent-reviews'

export function Dashboard() {
  return (
    <>
      <Header>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <Tabs
          orientation='vertical'
          defaultValue='overview'
          className='space-y-4'
        >
          <div className='w-full overflow-x-auto pb-2'>
            <TabsList>
              <TabsTrigger value='overview'>Visão geral</TabsTrigger>
              <TabsTrigger value='analytics'>Análises</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total de reviews
                  </CardTitle>
                  <span className='text-muted-foreground'>📝</span>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>1.284</div>
                  <p className='text-xs text-muted-foreground'>
                    Reviews recebidos no período
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>CSAT</CardTitle>
                  <span className='text-muted-foreground'>⭐</span>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>82%</div>
                  <p className='text-xs text-muted-foreground'>
                    Satisfação média dos clientes
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Sentimento médio
                  </CardTitle>
                  <span className='text-muted-foreground'>😊</span>
                </CardHeader>
                <CardContent>
                  <div className='flex items-center gap-2'>
                    <span className='text-2xl'>😊</span>
                    <span className='text-2xl font-bold'>+64%</span>
                  </div>
                  <p className='text-xs text-muted-foreground'>
                    Predominância positiva
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Pendentes de moderação
                  </CardTitle>
                  <span className='text-muted-foreground'>⏳</span>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>176</div>
                  <p className='text-xs text-muted-foreground'>
                    Aguardando aprovação
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
              <Card className='col-span-1 lg:col-span-4'>
                <CardHeader>
                  <CardTitle>Distribuição de avaliações</CardTitle>
                </CardHeader>
                <CardContent className='ps-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card className='col-span-1 lg:col-span-3'>
                <CardHeader>
                  <CardTitle>Avaliações recentes</CardTitle>
                  <CardDescription>
                    Últimas avaliações enviadas pelos clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentReviews />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value='analytics' className='space-y-4'>
            <Analytics />
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
