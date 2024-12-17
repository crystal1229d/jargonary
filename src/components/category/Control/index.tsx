'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Switch from '@/components/common/Switch'
import styles from './Control.module.css'

interface Props {
  currentSort: 'name' | 'recent'
}

export default function Control({ currentSort }: Props) {
  const router = useRouter()
  const [isNameSort, setIsNameSort] = useState(currentSort === 'name')

  const toggleSort = () => {
    const newSortBy = isNameSort ? 'recent' : 'name'
    setIsNameSort((prev) => !prev)
    router.push(`?sort_by=${newSortBy}`)
  }

  return (
    <div className={styles.control}>
      <div className={styles.switch}>
        <Switch isChecked={!isNameSort} onChange={toggleSort} />
        <div className={styles.message}>
          <span>Sort by</span>
          <span>{isNameSort ? 'Name' : 'Updated'}</span>
        </div>
      </div>

      <Link href="/category/new">
        <button className={styles.button}>Create</button>
      </Link>
    </div>
  )
}
