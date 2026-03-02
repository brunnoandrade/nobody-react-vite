import { useEffect } from 'react'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUpdateUser } from '../users/users.mutation'

const accountFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Por favor, informe seu nome.')
    .min(2, 'O nome deve ter pelo menos 2 caracteres.')
    .max(30, 'O nome não pode ter mais de 30 caracteres.'),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountForm() {
  const user = useAuthStore((state) => state.auth.user)

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: user?.name ?? '',
    },
  })

  const { mutateAsync, isPending } = useUpdateUser(user?.id ?? 0)

  useEffect(() => {
    if (user) {
      form.reset({ name: user.name })
    }
  }, [user])

  async function onSubmit(data: AccountFormValues) {
    try {
      await mutateAsync(data)

      toast.success('Conta atualizada com sucesso.')
      form.reset(data)
    } catch (error) {
      if (error instanceof AxiosError) {
        const message =
          error.response?.data?.message ?? 'Erro ao atualizar conta.'

        toast.error(message)
      } else {
        toast.error('Erro inesperado.')
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>

              <FormControl>
                <Input placeholder='Seu nome' {...field} />
              </FormControl>

              <FormDescription>
                Este é o nome que será exibido no seu perfil e nos e-mails.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' disabled={isPending}>
          {isPending ? 'Atualizando...' : 'Atualizar conta'}
        </Button>
      </form>
    </Form>
  )
}
