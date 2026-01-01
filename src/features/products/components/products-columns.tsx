import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { type Product } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const productsColumns: ColumnDef<Product>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Selecionar todos'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Selecionar linha'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Produto' />
    ),
    meta: {
      className: 'ps-1 max-w-[260px]',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => (
      <span className='truncate font-medium'>{row.getValue('name')}</span>
    ),
  },

  {
    accessorKey: 'sku',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SKU' />
    ),
    meta: {
      className: 'ps-1 max-w-[160px]',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => (
      <span className='truncate text-sm text-muted-foreground'>
        {row.getValue('sku')}
      </span>
    ),
  },

  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Preço' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const price = row.getValue<number>('price')
      return (
        <Badge variant='outline'>
          {price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </Badge>
      )
    },
  },

  {
    accessorKey: 'active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const active = row.getValue<boolean>('active')

      return (
        <Badge
          variant={active ? 'default' : 'secondary'}
          className={active ? 'bg-green-600' : ''}
        >
          {active ? 'Ativo' : 'Inativo'}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(String(row.getValue<boolean>(id)))
    },
  },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Criado em' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const date = row.getValue<Date>('createdAt')
      return (
        <span className='text-sm text-muted-foreground'>
          {date.toLocaleDateString('pt-BR')}
        </span>
      )
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
