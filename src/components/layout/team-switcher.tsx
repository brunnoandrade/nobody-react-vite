import { useQueryClient } from '@tanstack/react-query'
import { ChevronsUpDown, Plus, Store } from 'lucide-react'
import { useCurrentStore } from '@/stores/use-current-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { useStores } from '@/features/stores/components/stores-provider'
import { useGetStores } from '@/features/stores/stores.query'

export function TeamSwitcher() {
  const { isMobile } = useSidebar()

  const { setOpen } = useStores()

  const { currentStore, setStore } = useCurrentStore()

  const { data: stores, isLoading } = useGetStores()

  const queryClient = useQueryClient()

  const activeStore = stores?.find((s) => s.id === currentStore)

  function handleChange(id: number) {
    setStore(id)

    queryClient.invalidateQueries()
  }

  if (isLoading || !stores?.length) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <Store className='size-4' />
              </div>

              <div className='grid flex-1 text-start text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {activeStore?.name ?? 'Selecionar loja'}
                </span>
                <span className='truncate text-xs'>Loja ativa</span>
              </div>

              <ChevronsUpDown className='ms-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Lojas
            </DropdownMenuLabel>

            {stores.map((store) => (
              <DropdownMenuItem
                key={store.id}
                onClick={() => handleChange(store.id)}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <Store className='size-4 shrink-0' />
                </div>
                {store.name}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className='cursor-pointer gap-2 p-2'
              onClick={() => setOpen('add')}
            >
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <span className='font-medium text-muted-foreground'>
                Adicionar loja
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
