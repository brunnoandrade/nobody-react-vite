import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { type AuthUser, useAuthStore } from '@/stores/auth-store'
import { parseJwt } from '@/lib/jwt'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { useSignIn } from '@/features/auth/auth.mutation'

const formSchema = z.object({
  email: z.string().min(1, 'Informe seu e-mail').email('E-mail inválido'),
  password: z
    .string()
    .min(1, 'Informe sua senha')
    .min(7, 'A senha deve ter no mínimo 7 caracteres'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const navigate = useNavigate()

  const { auth } = useAuthStore()

  const signInMutation = useSignIn()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    signInMutation.mutate(data, {
      onSuccess: (response) => {
        const { access_token, refresh_token } = response

        const decodedUser = parseJwt<AuthUser>(access_token)

        auth.setUser(decodedUser)
        auth.setAccessToken(access_token)
        auth.setRefreshToken(refresh_token)

        toast.success(`Bem-vindo, ${decodedUser.email}`)

        navigate({
          to: redirectTo || '/',
          replace: true,
        })
      },
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type='email' placeholder='nome@exemplo.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />

              <Link
                to='/forgot-password'
                className='absolute end-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75'
              >
                Esqueceu a senha?
              </Link>
            </FormItem>
          )}
        />

        <Button className='mt-2' disabled={signInMutation.isPending}>
          {signInMutation.isPending ? (
            <Loader2 className='animate-spin' />
          ) : (
            <LogIn />
          )}
          Entrar
        </Button>
      </form>
    </Form>
  )
}
