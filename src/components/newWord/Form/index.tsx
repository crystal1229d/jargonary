'use client'

import { useState } from 'react'
import styles from './Form.module.css'
import { useRouter } from 'next/navigation'

export default function WordForm() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = () => {
    alert('submit form')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Category</label>
        <select></select>
      </div>

      <div>
        <label htmlFor="word">Word</label>
        <input type="text" placeholder="word" required />
      </div>

      <div>
        <label htmlFor="phonetic">PhoneticAlphabet</label>
        <input type="text" placeholder="phonetic" required />
      </div>

      <div>
        <label htmlFor="definition">Definition</label>
        <input type="text" placeholder="definition" required />
      </div>

      <div>
        <label htmlFor="jargonDefinition">JargonDefinition</label>
        <input type="text" placeholder="jargonDefinition" required />
      </div>

      <div>
        <label htmlFor="example">Example</label>
        <input type="text" placeholder="example" required />
      </div>

      <div>
        <label htmlFor="memo">Memo</label>
        <input type="text" placeholder="memo" required />
      </div>

      <div>
        <label htmlFor="linkedWord">LinkedWord</label>
        <input type="text" placeholder="linkedWord" required />
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
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </div>
    </form>
  )
}
