'use client'

import { Fragment, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Category, NewCategoryForm } from '@/types'
import EmojiHub from '@/components/newCategory/EmojiHub'
import Preview from '@/components/newCategory/Preview'
import styles from './Form.module.css'

interface Props {
  ColorPalette: Category['color'][]
}

export default function CategoryForm({ ColorPalette }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

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
    setLoading(true)

    const newCategory: NewCategoryForm = { name, color, icon }

    try {
      const response = await fetch('/api/category/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create category')
      }

      router.push('/category')
    } catch (error) {
      console.error(error)
      alert('Error creating category')
    } finally {
      setLoading(false)
    }
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
                onClick={(e) => {
                  e.preventDefault()
                  handleColorChange(colorOption)
                }}
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
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </Fragment>
  )
}
