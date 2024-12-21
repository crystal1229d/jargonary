'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Category, NewCategoryForm } from '@/types'
import EmojiHub from '@/components/newCategory/EmojiHub'
import Preview from '@/components/newCategory/Preview'
import { createCategory } from '@/services/category'
import styles from './Form.module.css'

interface Props {
  ColorPalette: Category['color'][]
}

export default function CategoryForm({ ColorPalette }: Props) {
  const router = useRouter()

  const [name, setName] = useState<Category['name']>('')
  const [icon, setIcon] = useState<Category['icon']>('🍀')
  const [color, setColor] = useState<Category['color']>('green')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // API 호출 로직 추가
    const newCategory: NewCategoryForm = {
      name,
      color,
      icon,
    }

    await createCategory(newCategory)
  }

  return (
    <Fragment>
      <Preview name={name} icon={icon} color={color} />
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="categoryName">Name</label>
          <input
            type="text"
            id="categoryName"
            placeholder="Enter category name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="categoryIcon">Icon</label>
          <EmojiHub selectedEmoji={icon} setSelectedEmoji={setIcon} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="categoryColor">Color</label>
          <div className={styles.colorOptions}>
            {ColorPalette.map((colorOption) => (
              <button
                key={colorOption}
                type="button"
                className={styles.colorCircle}
                aria-label={colorOption}
                onClick={() => handleColorChange(colorOption)}
              >
                <div
                  className={styles.color}
                  style={{ backgroundColor: `var(--${colorOption})` }}
                ></div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => router.back()}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.createButton}
            style={{ backgroundColor: `var(--${color})` }}
          >
            Create
          </button>
        </div>
      </form>
    </Fragment>
  )
}
