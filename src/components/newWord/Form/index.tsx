'use client'

import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Category, WordDefinition, WordLinkType } from '@/types'
import { generateTempId } from '@/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import SelectCategory from '../SelectCategory'
import LinkedWordsForm from '../LinkedWordsForm'

import styles from './Form.module.css'

interface Props {
  categories: Category[] | []
  wordLinkTypes: WordLinkType[]
}

export default function WordForm({ categories, wordLinkTypes }: Props) {
  const router = useRouter()

  const [definitions, setDefinitions] = useState<WordDefinition[]>([
    { id: generateTempId(), definition: '', isJargon: false, order: 1 },
  ])
  const [examples, setExamples] = useState<string[]>([''])
  const [memo, setMemo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

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

  const handleDefinitionChange = (id: string, value: string) => {
    setDefinitions((prev) =>
      prev.map((def) => (def.id === id ? { ...def, definition: value } : def)),
    )
  }

  const handleAddDefinition = () => {
    setDefinitions((prev) => [
      ...prev,
      {
        id: generateTempId(),
        definition: '',
        isJargon: false,
        order: prev.length + 1,
      },
    ])
  }

  const handleRemoveDefinition = (id: string) => {
    setDefinitions((prev) => prev.filter((def) => def.id !== id))
  }

  const handleToggleJargon = (id: string) => {
    setDefinitions((prev) =>
      prev.map((def) =>
        def.id === id ? { ...def, isJargon: !def.isJargon } : def,
      ),
    )
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    try {
      alert('created')
      router.push('/words')
    } catch (error) {
      console.error(error)
      alert('Failed to create word')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <SelectCategory categories={categories} />

      <div className={styles.formGroup}>
        <label htmlFor="word">Word</label>
        <input type="text" placeholder="bug" required />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="ipa">IPA</label>
        <div className={styles.ipa}>
          <p>{`[`}</p>
          <input type="text" placeholder="bʌɡ" required />
          <p>{`]`}</p>
        </div>
      </div>

      <div className={`${styles.formGroup} ${styles.dynamicFields}`}>
        <label>Definition</label>
        {definitions.map((def, index) => (
          <div key={def.id} className={styles.dynamicField}>
            <p>{index + 1}</p>
            <input
              type="text"
              value={def.definition}
              onChange={(e) => handleDefinitionChange(def.id, e.target.value)}
              placeholder="버그"
            />
            <button
              type="button"
              className={`${styles.checkBtn} ${
                def.isJargon ? styles.jargon : ''
              }`}
              onClick={() => handleToggleJargon(def.id)}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={() => handleRemoveDefinition(def.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={styles.addBtn}
          onClick={handleAddDefinition}
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

      <LinkedWordsForm wordLinkTypes={wordLinkTypes} />

      <div className={styles.formGroup}>
        <label htmlFor="memo">Memo</label>
        <textarea
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
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
