import { useUserStore } from '@/store/user'
import { handleRequest } from '.'

interface User {
  id: string
  email: string
}

interface SignInResponse {
  user: User
}

export const signin = async (
  email: string,
  password: string,
  setError: (error: string | null) => void,
  successCallback: () => void,
) => {
  await handleRequest<SignInResponse>(
    '/api/auth/signin',
    'POST',
    { email, password },
    setError,
    ({ user }) => {
      const setUser = useUserStore.getState().setUser
      setUser({ id: user.id, email: user.email })
      successCallback()
    },
  )
}

export const signup = async (
  email: string,
  password: string,
  setError: (error: string | null) => void,
  successCallback: () => void,
) => {
  await handleRequest<SignInResponse>(
    '/api/auth/signup',
    'POST',
    { email, password },
    setError,
    ({ user }) => {
      const setUser = useUserStore.getState().setUser
      setUser({ id: user.id, email: user.email })
      successCallback()
    },
  )
}

export const signout = async (
  setError: ((error: string | null) => void) | null = null,
  successCallback?: () => void,
) => {
  await handleRequest<null>(
    '/api/auth/signout',
    'POST',
    null,
    setError || ((error) => error && console.error('Signout failed:', error)),
    successCallback ||
      (() => {
        const clearUser = useUserStore.getState().clearUser
        clearUser()
      }),
  )
}
