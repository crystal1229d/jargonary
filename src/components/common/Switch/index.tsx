'use client'

import styles from './Switch.module.css'

interface SwitchProps {
  isChecked: boolean
  onChange: () => void
}

export default function Switch({ isChecked, onChange }: SwitchProps) {
  return (
    <div className={styles.switch}>
      <label className={styles['slider-track']}>
        <input type="checkbox" onChange={onChange} checked={isChecked} />
        <span className={styles['slider-button']}></span>
      </label>
    </div>
  )
}
