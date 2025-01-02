'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { NAVIGATION } from '@/constants'
import { useUserStore } from '@/store/user'
// import { signout } from '@/services/auth'
import styles from './Navbar.module.css'
import SignOutButton from '@/components/common/SignoutButton'

export default function Navbar() {
  const location = usePathname()
  const user = useUserStore((state) => state.user)

  console.log('[Navbar] user : ', user)

  const currentPath = NAVIGATION.find(
    (nav) =>
      (nav.link === '/' && location === '/') ||
      (nav.link !== '/' && location.startsWith(nav.link)),
  )
  const [selectedNav, setSelectedNav] = useState(
    currentPath ? currentPath.label : '/',
  )

  useEffect(() => {
    const updatedPath = NAVIGATION.find(
      (nav) =>
        (nav.link === '/' && location === '/') ||
        (nav.link !== '/' && location.startsWith(nav.link)),
    )
    setSelectedNav(updatedPath ? updatedPath.label : '/')
  }, [location])

  useEffect(() => {
    console.log('[Navbar] user updated:', user)
  }, [user])

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        {NAVIGATION.map(({ label, link }) => (
          <li
            key={label}
            className={selectedNav === label ? styles.active : undefined}
          >
            <Link href={link}>{label}</Link>
          </li>
        ))}
        {user ? (
          // <li>
          //   <button onClick={async () => await signout()}>Logout</button>
          // </li>
          <li>
            <SignOutButton />
          </li>
        ) : (
          <li>
            <Link href="/signin">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
