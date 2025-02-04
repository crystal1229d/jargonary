'use client'

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Category, WordLinkType } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from './Form.module.css'
import Image from 'next/image'

interface Props {
  categories: Category[] | []
  wordLinkTypes: WordLinkType[]
}

export default function WordForm({ categories, wordLinkTypes }: Props) {
  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id,
  )
  const [definitions, setDefinitions] = useState<string[]>([''])
  const [examples, setExamples] = useState<string[]>([''])
  const [linkedWords, setLinkedwords] = useState<
    { type: WordLinkType; value: string }[]
  >([])

  const [showLinkedWordTypePicker, setShowLinkedWordTypePicker] =
    useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value)
  }

  const handleAddField = (setter: Dispatch<SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ''])
  }

  const handleRemoveField = (
    idx: number,
    setter: Dispatch<SetStateAction<string[]>>,
  ) => {
    setter((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleInputChange = (
    idx: number,
    value: string,
    setter: Dispatch<SetStateAction<string[]>>,
  ) => {
    setter((prev) => prev.map((item, i) => (i === idx ? value : item)))
  }

  const handleAddLinkedWord = (type: WordLinkType) => {
    setLinkedwords([...linkedWords, { type, value: '' }])
  }

  const handleRemoveLinkedWord = (idx: number) => {
    setLinkedwords((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleLinkedWordChange = (
    idx: number,
    value: string,
    setter: Dispatch<SetStateAction<{ type: WordLinkType; value: string }[]>>,
  ) => {
    setter((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, value } : item)),
    )
  }

  const handleSubmit = () => {
    setLoading(true)
    alert('submit form')
    setLoading(false)
  }

  const selectedCategoryInfo =
    categories.find((category) => category.id === selectedCategory) ||
    categories[0]

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* <div className={styles.formGroup}>
        <label htmlFor="category">Category</label>
        <select>
          {categories.map((category) => (
            <option key={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div> */}

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

      <div className={styles.formGroup}>
        <label htmlFor="word">Word</label>
        <input type="text" placeholder="bug" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="ipa">IPA</label>
        <input type="text" placeholder="bʌɡ" required />
      </div>

      <div className={`${styles.formGroup} ${styles.dynamicFields}`}>
        <label>Definition</label>
        {definitions.map((definition, index) => (
          <div key={index} className={styles.dynamicField}>
            <p>{index + 1}</p>
            <input
              type="text"
              value={definition}
              onChange={(e) =>
                handleInputChange(index, e.target.value, setDefinitions)
              }
              placeholder="버그"
            />
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => handleRemoveField(index, setDefinitions)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => handleAddField(setDefinitions)}
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
              placeholder="I'll fix the bug."
            />
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => handleRemoveField(index, setExamples)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => handleAddField(setExamples)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className={`${styles.formGroup} ${styles.dynamicFields}`}>
        <label>LinkedWords</label>
        {linkedWords.map((linkedWord, index) => (
          <div key={index} className={styles.dynamicField}>
            <span
              className={styles.linkedWordType}
              style={{ backgroundColor: linkedWord.type.color }}
            >
              {linkedWord.type.name}
            </span>
            <input
              type="text"
              value={linkedWord.value}
              onChange={(e) =>
                handleLinkedWordChange(index, e.target.value, setLinkedwords)
              }
              placeholder="linkedWord value"
            />
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => handleRemoveLinkedWord(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setShowLinkedWordTypePicker(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      {showLinkedWordTypePicker && (
        <div className={styles.linkedWordPicker}>
          <h3>Select LinkedWord Type</h3>
          <ul>
            {wordLinkTypes.map((type) => (
              <li
                key={type.id}
                style={{ color: type.color, cursor: 'pointer' }}
                onClick={() => handleAddLinkedWord(type)}
              >
                {type.name}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowLinkedWordTypePicker(false)}>
            Cancel
          </button>
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="memo">Memo</label>
        <textarea
          id="memo"
          placeholder="A bug is an error that prevents an app or website from operating the way it’s supposed to. This is one of the most common web development terms you’ll hear."
          required
          rows={5}
        />
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
