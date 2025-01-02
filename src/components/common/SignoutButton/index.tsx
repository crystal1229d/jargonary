'use client'

import { useUserStore } from '@/store/user'
import { useRouter } from 'next/navigation'

const SignOutButton = () => {
  const clearUser = useUserStore((state) => state.clearUser)
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to sign out')

      clearUser()
      router.push('/signin')
    } catch (error) {
      console.error('Signout failed:', error)
    }
  }

  return <button onClick={handleSignOut}>Logout</button>
}

export default SignOutButton
