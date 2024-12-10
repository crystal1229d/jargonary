'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
        <label className={styles['slider-track']}>
          <input type="checkbox" onChange={toggleSort} checked={!isNameSort} />
          <span className={styles['slider-button']}></span>
        </label>
        <div className={styles.message}>
          <span>Sort by</span>
          <span>{isNameSort ? 'Name' : 'Updated'}</span>
        </div>
      </div>

      <button className={styles.button}>Create</button>
    </div>
  )
}
