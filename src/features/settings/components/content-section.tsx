import { Separator } from '@/components/ui/separator'

type ContentSectionProps = {
  title: string
  desc: string
  children: React.ReactNode
  actions?: React.ReactNode
}

export function ContentSection({
  title,
  desc,
  children,
  actions,
}: ContentSectionProps) {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='flex items-center justify-between gap-4'>
        <div className='space-y-1'>
          <h3 className='text-lg font-medium'>{title}</h3>
          <p className='text-sm text-muted-foreground'>{desc}</p>
        </div>

        {actions && <div className='flex items-center'>{actions}</div>}
      </div>

      <Separator className='my-4 flex-none' />

      <div className='faded-bottom h-full w-full overflow-y-auto scroll-smooth pe-4 pb-12'>
        <div className='-mx-1 px-1.5 lg:max-w-xl'>{children}</div>
      </div>
    </div>
  )
}
