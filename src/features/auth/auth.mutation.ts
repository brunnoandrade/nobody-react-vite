import type { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { signIn, type SignInDTO, type SignInResponse } from './auth.service'

export function useSignIn() {
  return useMutation<
    SignInResponse,
    AxiosError<{ message?: string }>,
    SignInDTO
  >({
    mutationFn: signIn,
  })
}
