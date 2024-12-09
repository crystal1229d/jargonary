'use client'

import { useState } from 'react'
import styles from './Control.module.css'

export default function Control() {
  const [isNameSort, setIsNameSort] = useState(true)

  const toggleSort = () => {
    setIsNameSort((prev) => !prev)
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
