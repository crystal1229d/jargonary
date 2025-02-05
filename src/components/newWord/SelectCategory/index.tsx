'use client'

import Image from 'next/image'
import { Category } from '@/types'
import styles from './SelectCategory.module.css'
import { ChangeEvent, useState } from 'react'

interface Props {
  categories: Category[] | []
}

export default function SelectCategory({ categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id,
  )

  const selectedCategoryInfo =
    categories.find((category) => category.id === selectedCategory) ||
    categories[0]

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <div className={`${styles.formGroup} ${styles.categorySelect}`}>
      <div className={styles.imageSection}>
        <Image
          src={`/assets/images/short_category_${selectedCategoryInfo.color}.png`}
          alt="category"
          width="436"
          height="84"
          priority={true}
        />
      </div>
      <div className={styles.infoSection}>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ background: `var(--${selectedCategoryInfo.color})` }}
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              style={{ background: `var(--${category.color})` }}
            >
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
