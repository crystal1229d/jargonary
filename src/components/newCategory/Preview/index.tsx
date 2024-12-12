'use client'

import Image from 'next/image'
import { Category } from '@/types'
import styles from './Preview.module.css'

interface Props {
  name: Category['name']
  icon: Category['icon']
  color: Category['color']
}

export default function Preview({ name, icon, color }: Props) {
  return (
    <div className={styles.preview}>
      <div className={styles['preview-image']}>
        <Image
          src={`/assets/images/category_${color}.png`}
          alt="category"
          width="222"
          height="156"
          priority={true}
        />
      </div>
      <div className={styles['preview-info']}>
        <div>
          <span className={styles.icon}>{icon}</span>
        </div>
        <div>
          <span
            className={`${styles.name}`}
            style={{ backgroundColor: `var(--${color}-shadow)` }}
          >
            {name || 'name'}
          </span>
        </div>
        <span className={styles.words}>0 words</span>
      </div>
    </div>
  )
}
