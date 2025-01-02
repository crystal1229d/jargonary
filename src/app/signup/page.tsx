import { signin, signup } from '@/services/auth'
import { createClient } from '@/lib/supabase/server-client'
import { redirect } from 'next/navigation'

import styles from './page.module.css'
import Link from 'next/link'

export default async function SignupPage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    redirect('/')
  }

  return (
    <div className={styles.background}>
      <main className={styles.page}>
        <h2 className={styles.title}>Sign Up</h2>
        <form className={styles.form}>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />

          <button formAction={signin}>Sign in</button>
          <button formAction={signup}>Sign up</button>

          <Link className="text-sm underline" href="/signin">
            Already have an account? Sign In
          </Link>
        </form>
      </main>
    </div>
  )
}
