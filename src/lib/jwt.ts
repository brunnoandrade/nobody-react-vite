export function parseJwt<T>(token: string): T {
  const base64 = token.split('.')[1]
  const jsonPayload = atob(base64)
  return JSON.parse(jsonPayload) as T
}
