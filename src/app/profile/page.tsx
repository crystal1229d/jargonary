import { createClient } from '@/lib/supabase/server-client'
import { redirect } from 'next/navigation'
import styles from './page.module.css'

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <main className={styles.page}>
      <div className={styles['profile-section']}>
        {/* 명함 */}
        <div className={styles['profile-card']}>
          <div className={styles['profile-image']}></div>

          <div className={styles['profile-info']}>
            <div>Email</div>
            <div>{data.user.email}</div>
            <div>Name</div>
            <div>crystal</div>
          </div>
        </div>
      </div>

      <div className={styles['buttons-section']}>
        <button>My Info</button>
        <button>Statistics</button>
        <button>Sign out</button>
        <button>Delete account</button>
      </div>
    </main>
  )
}
