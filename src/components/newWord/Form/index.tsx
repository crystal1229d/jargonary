'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Category } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

import styles from './Form.module.css'

interface Props {
  categories: Category[] | []
}

export default function WordForm({ categories }: Props) {
  const router = useRouter()

  const [definitions, setDefinitions] = useState<string[]>([''])
  const [jargondefinitions, setJargonDefinitions] = useState<string[]>([''])
  const [examples, setExamples] = useState<string[]>([''])
  const [loading, setLoading] = useState<boolean>(false)

  const handleAddField = (setter: Dispatch<SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ''])
  }

  const handleRemoveField = (
    index: number,
    setter: Dispatch<SetStateAction<string[]>>,
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (
    index: number,
    value: string,
    setter: Dispatch<SetStateAction<string[]>>,
  ) => {
    setter((prev) => prev.map((item, i) => (i === index ? value : item)))
  }

  const handleSubmit = () => {
    setLoading(true)
    alert('submit form')
    setLoading(false)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="category">Category</label>
        <select>
          {categories.map((category) => (
            <option key={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="word">Word</label>
        <input type="text" placeholder="word" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="ipa">IPA</label>
        <input type="text" placeholder="ipa" required />
      </div>

      <div className={`${styles.formGroup} ${styles.dynamicFields}`}>
        <label>Definition</label>
        {definitions.map((definition, index) => (
          <div key={index} className={styles.dynamicField}>
            <input
              type="text"
              value={definition}
              onChange={(e) =>
                handleInputChange(index, e.target.value, setDefinitions)
              }
              placeholder="definition"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setDefinitions)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField(setDefinitions)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className={`${styles.formGroup} ${styles.dynamicFields}`}>
        <label>Jargon Definition</label>
        {jargondefinitions.map((jDefinition, index) => (
          <div key={index} className={styles.dynamicField}>
            <input
              type="text"
              value={jDefinition}
              onChange={(e) =>
                handleInputChange(index, e.target.value, setJargonDefinitions)
              }
              placeholder="definition"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setJargonDefinitions)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddField(setJargonDefinitions)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className={`${styles.formGroup} ${styles.dynamicFields}`}>
        <label>Example</label>
        {examples.map((example, index) => (
          <div key={index} className={styles.dynamicField}>
            <input
              type="text"
              value={example}
              onChange={(e) =>
                handleInputChange(index, e.target.value, setExamples)
              }
              placeholder="definition"
            />
            <button
              type="button"
              onClick={() => handleRemoveField(index, setExamples)}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField(setExamples)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="linkedWord">LinkedWord</label>
        <input type="text" placeholder="linkedWord" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="memo">Memo</label>
        <textarea id="memo" placeholder="memo" required rows={5} />
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
