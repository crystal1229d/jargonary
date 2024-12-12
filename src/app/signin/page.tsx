import { login, signup } from '@/services/auth'
import styles from './page.module.css'

export default function SigninPage() {
  return (
    <main className={styles.page}>
      <h2>Sign In</h2>
      <form className={styles.form}>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />

        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />

        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </main>
  )
}
