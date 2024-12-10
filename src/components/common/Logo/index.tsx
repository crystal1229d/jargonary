'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './Logo.module.css'

interface Props {
  linked?: boolean
  to?: string
}

export default function Logo({ linked = true, to = '/' }: Props) {
  const logoContent = (
    <div className={styles.logo}>
      <Image
        src={'/assets/images/logo_2.png'}
        alt="logo"
        width={204}
        height={37}
        priority={true}
      />
      {/* <Image
        src="/assets/images/logo_1.png"
        alt="logo"
        width={188}
        height={40}
      /> */}
    </div>
  )

  return linked ? (
    <Link href={to} className={styles.link}>
      {logoContent}
    </Link>
  ) : (
    logoContent
  )
}
