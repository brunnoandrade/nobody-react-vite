import { AxiosError } from 'axios'
import { toast } from 'sonner'

interface ErrorResponse {
  message?: string
  title?: string
}

export function handleServerError(error: unknown) {
  let errMsg = 'Something went wrong!'

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number((error as { status?: number }).status) === 204
  ) {
    errMsg = 'Content not found.'
  }

  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse | undefined

    errMsg = data?.message ?? data?.title ?? error.message ?? errMsg
  }

  toast.error(errMsg)
}
