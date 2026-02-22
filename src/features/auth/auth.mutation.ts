import type { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { signIn, signUp } from './auth.service'
import {
  type SignInDTO,
  type SignInResponse,
  type SignUpDTO,
  type SignUpResponse,
} from './auth.types'

export function useSignIn() {
  return useMutation<
    SignInResponse,
    AxiosError<{ message?: string }>,
    SignInDTO
  >({
    mutationFn: signIn,
  })
}

export function useSignUp() {
  return useMutation<
    SignUpResponse,
    AxiosError<{ message?: string }>,
    SignUpDTO
  >({
    mutationFn: signUp,
  })
}
