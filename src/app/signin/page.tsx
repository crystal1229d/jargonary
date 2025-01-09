import Link from 'next/link'
import SignInForm from '@/components/signin/SigninForm'
import styles from './page.module.css'

export default async function SigninPage() {
  return (
    <div className={styles.background}>
      <main className={styles.page}>
        <h2 className={styles.title}>Sign In</h2>
        <SignInForm />
        <Link className="text-sm underline" href="/signup">
          Don&apos;t have an account? Sign up here
        </Link>
      </main>
    </div>
  )
}
