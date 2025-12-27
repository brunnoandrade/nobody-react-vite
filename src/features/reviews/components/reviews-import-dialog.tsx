import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
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

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: 'Envie um arquivo',
    })
    .refine(
      (files) => ['text/csv'].includes(files?.[0]?.type),
      'O arquivo deve estar no formato CSV.'
    ),
})

type ReviewsImportDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReviewsImportDialog({
  open,
  onOpenChange,
}: ReviewsImportDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { file: undefined },
  })

  const fileRef = form.register('file')

  const onSubmit = () => {
    const file = form.getValues('file')

    if (file && file[0]) {
      const fileDetails = {
        name: file[0].name,
        size: file[0].size,
        type: file[0].type,
      }

      showSubmittedData(
        fileDetails,
        'Você importou o seguinte arquivo de avaliações:'
      )
    }

    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val)
        form.reset()
      }}
    >
      <DialogContent className='gap-2 sm:max-w-sm'>
        <DialogHeader className='text-start'>
          <DialogTitle>Importar avaliações</DialogTitle>
          <DialogDescription>
            Importe avaliações manualmente a partir de um arquivo CSV.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id='reviews-import-form' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='file'
              render={() => (
                <FormItem className='my-2'>
                  <FormLabel>Arquivo</FormLabel>
                  <FormControl>
                    <Input type='file' {...fileRef} className='h-8 py-0' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button variant='outline'>Cancelar</Button>
          </DialogClose>
          <Button type='submit' form='reviews-import-form'>
            Importar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
