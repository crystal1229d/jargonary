'use client'

import { signout } from '@/utils/auth'
import { useRouter } from 'next/navigation'

const SignOutButton = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    await signout(null, () => {
      router.push('/')
    })
  }

  return <button onClick={handleSignOut}>Logout</button>
}

export default SignOutButton
