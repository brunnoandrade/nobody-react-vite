import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'

const generalFormSchema = z.object({
  autoApproveReviews: z.boolean(),
  showReviewAuthor: z.boolean(),
})

type GeneralFormValues = z.infer<typeof generalFormSchema>

const defaultValues: GeneralFormValues = {
  autoApproveReviews: false,
  showReviewAuthor: true,
}

export function GeneralForm() {
  const form = useForm<GeneralFormValues>({
    resolver: zodResolver(generalFormSchema),
    defaultValues,
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          showSubmittedData(data, 'Configurações gerais atualizadas:')
        )}
        className='space-y-8'
      >
        <FormField
          control={form.control}
          name='autoApproveReviews'
          render={({ field }) => (
            <FormItem className='flex items-start justify-between gap-4 rounded-lg border p-4'>
              <div className='space-y-1'>
                <FormLabel>Aprovação automática de avaliações</FormLabel>
                <FormDescription>
                  Quando ativado, novas avaliações serão aprovadas
                  automaticamente. Avaliações existentes não serão afetadas.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label='Ativar aprovação automática'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='showReviewAuthor'
          render={({ field }) => (
            <FormItem className='flex items-start justify-between gap-4 rounded-lg border p-4'>
              <div className='space-y-1'>
                <FormLabel>Exibir nome do autor</FormLabel>
                <FormDescription>
                  Controla se o nome do autor das avaliações será exibido
                  publicamente. Ao desativar, as avaliações serão mostradas de
                  forma anônima.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label='Exibir nome do autor das avaliações'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit'>Salvar configurações</Button>
      </form>
    </Form>
  )
}
