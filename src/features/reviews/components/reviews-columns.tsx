import { type ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table'
import { reviewStatuses } from '../data/data'
import { type Review } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const reviewsColumns: ColumnDef<Review>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Selecionar todas'
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
    accessorKey: 'product',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Produto' />
    ),
    meta: {
      className: 'ps-1 max-w-[220px]',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => (
      <span className='truncate font-medium'>{row.getValue('product')}</span>
    ),
  },
  {
    accessorKey: 'author',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Autor' />
    ),
    meta: {
      className: 'ps-1 max-w-[180px]',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => (
      <span className='truncate text-sm'>{row.getValue('author')}</span>
    ),
  },
  {
    accessorKey: 'comment',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Comentário' />
    ),
    meta: {
      className: 'ps-1 max-w-0 w-full',
      tdClassName: 'ps-4',
    },
    cell: ({ row }) => (
      <span className='line-clamp-2 max-w-[620px] text-muted-foreground'>
        {row.getValue('comment')}
      </span>
    ),
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nota' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-3' },
    cell: ({ row }) => {
      const rating = row.getValue<number>('rating')
      return <Badge variant='outline'>⭐ {rating}</Badge>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    meta: { className: 'ps-1', tdClassName: 'ps-4' },
    cell: ({ row }) => {
      const status = reviewStatuses.find(
        (s) => s.value === row.getValue('status')
      )

      if (!status) return null

      return (
        <div className='flex w-[120px] items-center gap-2'>
          <status.icon className='size-4 text-muted-foreground' />
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
