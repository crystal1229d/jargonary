'use client'

import { ChangeEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Category } from '@/types'
import styles from './SelectCategory.module.css'

interface Props {
  categories: Category[] | []
  selectedCategory: Category['id']
  onChange: (categoryId: Category['id']) => void
}

export default function SelectCategory({
  categories,
  selectedCategory,
  onChange,
}: Props) {
  const selectedCategoryInfo =
    categories.find((category) => category.id === selectedCategory) ||
    categories[0]

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={`${styles.formGroup} ${styles.categorySelect}`}>
      <div className={styles.imageSection}>
        <Image
          src={`/assets/images/short_category_${
            selectedCategoryInfo?.color ?? 'yellow'
          }.png`}
          alt="category"
          width="436"
          height="84"
          priority={true}
        />
      </div>
      <div className={styles.infoSection}>
        {categories.length === 0 ? (
          <Link href="/category/new" className={styles.createBtn}>
            <button type="button">Create</button>
          </Link>
        ) : (
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
        )}
      </div>
    </div>
  )
}
