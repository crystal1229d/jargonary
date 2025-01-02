/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/user'
import styles from './SigninForm.module.css'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to sign in')
      }

      const { user } = await res.json()
      setUser({ id: user.id, email: user.email })
      router.push('/')
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleSignUp = async () => {
    setError(null)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Failed to sign up')
      }

      const { user } = await res.json()
      setUser({ id: user.id, email: user.email })
      router.push('/')
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <form onSubmit={handleSignIn} className={styles.form}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
      <button
        type="button"
        onClick={handleSignUp}
        className={styles.signupButton}
      >
        Sign Up
      </button>
    </form>
  )
}
