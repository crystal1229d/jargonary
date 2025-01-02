/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signin, signup } from '@/utils/auth'
import styles from './SigninForm.module.css'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signin(email, password, setError, () => {
      router.push('/')
    })
  }

  const handleSignUp = async () => {
    await signup(email, password, setError, () => {
      router.push('/')
    })
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
