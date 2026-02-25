import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { FcGoogle } from 'react-icons/fc'
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
import { useSignUp } from '../../auth.mutation'

const formSchema = z
  .object({
    email: z.email({
      error: (iss) => (iss.input === '' ? 'Informe seu e-mail' : undefined),
    }),
    password: z
      .string()
      .min(1, 'Informe sua senha')
      .min(7, 'A senha deve ter no mínimo 7 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem.',
    path: ['confirmPassword'],
  })

export function SignUpForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate()

  const { auth } = useAuthStore()

  const signUpMutation = useSignUp()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    const baseName = data.email.split('@')[0]

    signUpMutation.mutate(
      {
        email: data.email,
        password: data.password,
        name: baseName,
        store_name: `Loja de ${baseName}`,
      },
      {
        onSuccess: (response) => {
          const { access_token, refresh_token } = response

          const decodedUser = parseJwt<AuthUser>(access_token)

          auth.setUser(decodedUser)
          auth.setAccessToken(access_token)
          auth.setRefreshToken(refresh_token)

          toast.success('Conta criada com sucesso!')

          navigate({ to: '/', replace: true })
        },
      }
    )
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
                <Input placeholder='nome@exemplo.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='mt-2' disabled={signUpMutation.isPending}>
          Criar conta
        </Button>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Ou continue com
            </span>
          </div>
        </div>

        <Button
          variant='outline'
          type='button'
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`
          }}
        >
          <FcGoogle className='h-4 w-4' />
          Google
        </Button>
      </form>
    </Form>
  )
}
