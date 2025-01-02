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

// import { signin, signup } from '@/services/auth'
// import { createClient } from '@/lib/supabase/server-client'
// import { redirect } from 'next/navigation'

// import styles from './page.module.css'
// import Link from 'next/link'

// export default async function SigninPage() {
//   const supabase = await createClient()
//   const { data } = await supabase.auth.getUser()

//   console.log('SininPage / ', data?.user)

//   if (data?.user) {
//     redirect('/')
//   }

//   return (
//     <div className={styles.background}>
//       <main className={styles.page}>
//         <h2 className={styles.title}>Sign In</h2>
//         <form className={styles.form}>
//           <label htmlFor="email">Email</label>
//           <input id="email" name="email" type="email" required />

//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             name="password"
//             type="password"
//             autoComplete="password"
//             required
//           />

//           <button formAction={signin}>Sign in</button>
//           <button formAction={signup}>Sign up</button>

//           <Link className="text-sm underline" href="/signup">
//             Don&apos;t have an account? Sign up here
//           </Link>
//         </form>
//       </main>
//     </div>
//   )
// }
