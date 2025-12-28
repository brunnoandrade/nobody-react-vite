import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AnalyticsChart } from './analytics-chart'

export function Analytics() {
  return (
    <div className='space-y-4'>
      <Card>
        <CardHeader>
          <CardTitle>Evolução das avaliações</CardTitle>
          <CardDescription>
            Volume semanal de avaliações e nota média
          </CardDescription>
        </CardHeader>
        <CardContent className='px-6'>
          <AnalyticsChart />
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
        <Card className='col-span-1 lg:col-span-4'>
          <CardHeader>
            <CardTitle>Avaliações por produto</CardTitle>
            <CardDescription>
              Produtos com maior volume de feedback
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={[
                { name: 'Produto A', value: 512 },
                { name: 'Produto B', value: 238 },
                { name: 'Produto C', value: 174 },
                { name: 'Produto D', value: 104 },
              ]}
              barClass='bg-primary'
              valueFormatter={(n) => `${n}`}
            />
          </CardContent>
        </Card>

        <Card className='col-span-1 lg:col-span-3'>
          <CardHeader>
            <CardTitle>Distribuição por nota</CardTitle>
            <CardDescription>
              Percentual de avaliações por rating
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleBarList
              items={[
                { name: '⭐ 5', value: 48 },
                { name: '⭐ 4', value: 27 },
                { name: '⭐ 3', value: 15 },
                { name: '⭐ 1–2', value: 10 },
              ]}
              barClass='bg-muted-foreground'
              valueFormatter={(n) => `${n}%`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SimpleBarList({
  items,
  valueFormatter,
  barClass,
}: {
  items: { name: string; value: number }[]
  valueFormatter: (n: number) => string
  barClass: string
}) {
  const max = Math.max(...items.map((i) => i.value), 1)

  return (
    <ul className='space-y-3'>
      {items.map((i) => {
        const width = `${Math.round((i.value / max) * 100)}%`

        return (
          <li key={i.name} className='flex items-center justify-between gap-3'>
            <div className='min-w-0 flex-1'>
              <div className='mb-1 truncate text-xs text-muted-foreground'>
                {i.name}
              </div>
              <div className='h-2.5 w-full rounded-full bg-muted'>
                <div
                  className={`h-2.5 rounded-full ${barClass}`}
                  style={{ width }}
                />
              </div>
            </div>
            <div className='ps-2 text-xs font-medium tabular-nums'>
              {valueFormatter(i.value)}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
