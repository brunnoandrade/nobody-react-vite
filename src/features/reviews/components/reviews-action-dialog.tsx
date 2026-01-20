import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { reviewProducts } from '../data/data'
import { type Review } from '../data/schema'

const formSchema = z.object({
  product: z.string().min(1, 'O produto é obrigatório.'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(1, 'O comentário é obrigatório.'),
  author: z.string().min(1, 'O autor é obrigatório.'),
  showAuthor: z.boolean(),
  status: z.enum(['pending', 'approved', 'rejected']),
  isEdit: z.boolean(),
})

type ReviewForm = z.infer<typeof formSchema>

type ReviewActionDialogProps = {
  currentRow?: Review
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReviewActionDialog({
  currentRow,
  open,
  onOpenChange,
}: ReviewActionDialogProps) {
  const isEdit = !!currentRow

  const form = useForm<ReviewForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          product: currentRow.product,
          rating: currentRow.rating,
          comment: currentRow.comment,
          author: currentRow.author,
          showAuthor: currentRow.showAuthor,
          status: currentRow.status,
          isEdit,
        }
      : {
          product: '',
          rating: 5,
          comment: '',
          author: '',
          showAuthor: true,
          status: 'pending',
          isEdit,
        },
  })

  const onSubmit = (values: ReviewForm) => {
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
            {isEdit ? 'Editar Review' : 'Adicionar Review'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Atualize as informações do review.'
              : 'Crie um novo review para o produto.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id='review-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='product'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Produto</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecione o produto' />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {reviewProducts.map((product) => (
                        <SelectItem key={product.value} value={product.value}>
                          {product.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nota (1 a 5)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      min={1}
                      max={5}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='comment'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comentário</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Escreva o feedback do cliente'
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='author'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input placeholder='Nome do autor' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='showAuthor'
              render={({ field }) => (
                <FormItem className='flex items-center gap-2'>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className='mb-0'>Exibir nome do autor</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione o status' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='pending'>Pendente</SelectItem>
                      <SelectItem value='approved'>Aprovado</SelectItem>
                      <SelectItem value='rejected'>Rejeitado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button type='submit' form='review-form'>
            Salvar review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
