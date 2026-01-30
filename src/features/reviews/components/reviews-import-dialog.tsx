import { useCallback, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload, FileText } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { cn } from '@/lib/utils'
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
import { ReviewsImportTablePreview } from './reviews-import-table-preview'

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Envie um arquivo')
    .refine(
      (files) => files?.[0]?.type === 'text/csv',
      'O arquivo deve estar no formato CSV'
    ),
})

const expectedFields = [
  'id',
  'product',
  'rating',
  'comment',
  'author',
  'status',
]

type ReviewsImportDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReviewsImportDialog({
  open,
  onOpenChange,
}: ReviewsImportDialogProps) {
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const droppedFile = acceptedFiles[0]
      if (!droppedFile) return

      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(droppedFile)

      form.setValue('file', dataTransfer.files, {
        shouldValidate: true,
      })

      setFile(droppedFile)
    },
    [form]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false,
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log('Arquivo importado:', data.file[0])
    onOpenChange(false)
    form.reset()
    setFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-hidden'>
        <DialogHeader className='flex-shrink-0'>
          <DialogTitle>Importar avaliações</DialogTitle>
          <DialogDescription>
            Envie um arquivo CSV com as colunas esperadas.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id='reviews-import-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-4 overflow-y-auto pr-1'
          >
            <FormField
              control={form.control}
              name='file'
              render={() => (
                <FormItem>
                  <FormLabel>Arquivo</FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps()}
                      className={cn(
                        'box-border w-full',
                        'flex flex-col items-center justify-center gap-2',
                        'rounded-md border border-dashed',
                        'px-4 py-6 text-center',
                        'cursor-pointer transition',
                        isDragActive
                          ? 'border-primary bg-muted'
                          : 'border-muted'
                      )}
                    >
                      <input {...getInputProps()} />
                      <Upload className='h-5 w-5 text-muted-foreground' />
                      <span className='text-sm break-words text-muted-foreground'>
                        Arraste o CSV aqui ou clique para selecionar
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {file && (
              <>
                <div className='flex max-w-full items-center gap-2 text-sm'>
                  <FileText className='h-4 w-4 flex-shrink-0' />
                  <span className='truncate'>{file.name}</span>
                </div>

                <div>
                  <p className='mb-1 text-sm font-medium'>Campos esperados</p>
                  <div className='flex max-w-full flex-wrap gap-1'>
                    {expectedFields.map((field) => (
                      <span
                        key={field}
                        className='rounded-full bg-muted px-3 py-1 text-xs font-medium whitespace-nowrap'
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                <ReviewsImportTablePreview file={file} />
              </>
            )}
          </form>
        </Form>

        <DialogFooter className='flex-shrink-0 gap-2 pt-3'>
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
