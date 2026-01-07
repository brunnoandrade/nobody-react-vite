'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type Store } from '../data/schema'

const formSchema = z.object({
  name: z.string().min(1, 'O nome da loja é obrigatório.'),
  slug: z.string().min(1, 'O slug é obrigatório.'),
  email: z.email({
    error: (iss) => (iss.input === '' ? 'O e-mail é obrigatório.' : undefined),
  }),
  phoneNumber: z.string().min(1, 'O telefone é obrigatório.'),
  document: z.string().optional(),
  isEdit: z.boolean(),
})

type StoreForm = z.infer<typeof formSchema>

type StoreActionDialogProps = {
  currentRow?: Store
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StoresActionDialog({
  currentRow,
  open,
  onOpenChange,
}: StoreActionDialogProps) {
  const isEdit = !!currentRow

  const form = useForm<StoreForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          name: currentRow.name,
          slug: currentRow.slug,
          email: currentRow.email,
          phoneNumber: currentRow.phoneNumber,
          document: currentRow.document,
          isEdit,
        }
      : {
          name: '',
          slug: '',
          email: '',
          phoneNumber: '',
          document: '',
          isEdit,
        },
  })

  const onSubmit = (values: StoreForm) => {
    form.reset()
    showSubmittedData(values)
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-xl'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Editar Loja' : 'Adicionar Nova Loja'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Atualize as informações da loja.'
              : 'Crie uma nova loja.'}{' '}
            Clique em salvar quando finalizar.
          </DialogDescription>
        </DialogHeader>

        <div className='w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='store-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Nome da Loja
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Minha Loja'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='slug'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='minha-loja'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='loja@email.com'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Telefone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='+55 11 99999-9999'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='document'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-end'>
                      Documento
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='CNPJ / VAT'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        <DialogFooter>
          <Button type='submit' form='store-form'>
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
