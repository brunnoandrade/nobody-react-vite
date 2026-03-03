import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { useInviteUser } from './invitations.mutation'

const schema = z.object({
  email: z.string().email('E-mail inválido'),
  roleId: z.string().min(1, 'Selecione uma permissão'),
})

type FormValues = z.infer<typeof schema>

export function InviteUserDialog() {
  const [open, setOpen] = useState(false)
  const { mutateAsync, isPending } = useInviteUser()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      roleId: '',
    },
  })

  async function onSubmit(values: FormValues) {
    await mutateAsync({
      email: values.email,
      roleId: Number(values.roleId),
    })

    form.reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          form.reset()
        }
        setOpen(state)
      }}
    >
      <DialogTrigger asChild>
        <Button size='sm'>
          <Plus className='h-4 w-4' />
          Convidar usuário
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>Convidar novo usuário</DialogTitle>
          <DialogDescription>
            Envie um convite para que o usuário tenha acesso à sua loja.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id='invite-user-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='usuario@email.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='roleId'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Permissão</FormLabel>

                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Selecione uma permissão' />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value='1'>Admin</SelectItem>
                      <SelectItem value='2'>Editor</SelectItem>
                      <SelectItem value='3'>Viewer</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            type='submit'
            form='invite-user-form'
            disabled={isPending}
            className='w-full'
          >
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Enviar convite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
