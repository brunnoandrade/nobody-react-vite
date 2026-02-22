import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const ACCESS_TOKEN = 'auth-access-token'
const REFRESH_TOKEN = 'auth-refresh-token'

export interface AuthUser {
  id: number
  email: string
  name: string
  documentId?: string | null
  phone?: string | null
  state?: string | null
  language?: string | null
}

interface AuthState {
  auth: {
    user: AuthUser | null
    accessToken: string
    refreshToken: string
    setUser: (user: AuthUser | null) => void
    setAccessToken: (token: string) => void
    setRefreshToken: (token: string) => void
    reset: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const accessTokenCookie = getCookie(ACCESS_TOKEN)
  const refreshTokenCookie = getCookie(REFRESH_TOKEN)

  return {
    auth: {
      user: null,
      accessToken: accessTokenCookie ? JSON.parse(accessTokenCookie) : '',
      refreshToken: refreshTokenCookie ? JSON.parse(refreshTokenCookie) : '',

      setUser: (user) =>
        set((state) => ({
          auth: { ...state.auth, user },
        })),

      setAccessToken: (token) =>
        set((state) => {
          setCookie(ACCESS_TOKEN, JSON.stringify(token))
          return { auth: { ...state.auth, accessToken: token } }
        }),

      setRefreshToken: (token) =>
        set((state) => {
          setCookie(REFRESH_TOKEN, JSON.stringify(token))
          return { auth: { ...state.auth, refreshToken: token } }
        }),

      reset: () =>
        set((state) => {
          removeCookie(ACCESS_TOKEN)
          removeCookie(REFRESH_TOKEN)

          return {
            auth: {
              ...state.auth,
              user: null,
              accessToken: '',
              refreshToken: '',
            },
          }
        }),
    },
  }
})
