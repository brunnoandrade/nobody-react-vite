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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { reviewProducts } from '../data/data'

const users = [
  { id: 'u_1', name: 'João Silva', email: 'joao@email.com' },
  { id: 'u_2', name: 'Maria Souza', email: 'maria@email.com' },
  { id: 'u_3', name: 'Carlos Pereira', email: 'carlos@email.com' },
]

const formSchema = z.object({
  userId: z.string().min(1, 'O usuário é obrigatório.'),
  email: z.string().email('Informe um e-mail válido.'),
  product: z.string().min(1, 'O produto é obrigatório.'),
  message: z.string().optional(),
})

type ReviewInviteForm = z.infer<typeof formSchema>

type ReviewInviteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReviewInviteDialog({
  open,
  onOpenChange,
}: ReviewInviteDialogProps) {
  const form = useForm<ReviewInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: '',
      email: '',
      product: '',
      message: '',
    },
  })

  const onSubmit = (values: ReviewInviteForm) => {
    showSubmittedData(values)
    form.reset()
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
          <DialogTitle>Enviar pedido de avaliação</DialogTitle>
          <DialogDescription>
            Envie manualmente um convite para um cliente avaliar um produto.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id='review-invite-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <FormField
                control={form.control}
                name='userId'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Usuário</FormLabel>

                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        field.onChange(value)

                        const selectedUser = users.find((u) => u.id === value)

                        if (selectedUser) {
                          form.setValue('email', selectedUser.email)
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue placeholder='Selecione o usuário' />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.name}
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
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail do cliente</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='cliente@email.com'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem personalizada (opcional)</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder='Ex: Sua opinião é muito importante para nós!'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button type='submit' form='review-invite-form'>
            Enviar convite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
