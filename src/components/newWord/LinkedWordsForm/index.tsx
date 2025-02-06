'use client'

import { useState } from 'react'
import { LinkedWordInput, WordLinkType } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import styles from './LinkedWordsForm.module.css'

interface Props {
  wordLinkTypes: WordLinkType[]
  linkedWords: LinkedWordInput[]
  onChange: (linkedWords: LinkedWordInput[]) => void
}

export default function LinkedWordsForm({
  wordLinkTypes,
  linkedWords,
  onChange,
}: Props) {
  const [showLinkedWordTypePicker, setShowLinkedWordTypePicker] =
    useState<boolean>(false)

  const handleAddLinkedWord = (type: WordLinkType) => {
    onChange([...linkedWords, { type, value: '' }])
  }

  const handleRemoveLinkedWord = (idx: number) => {
    onChange(linkedWords.filter((_, i) => i !== idx))
  }

  const handleLinkedWordChange = (idx: number, value: string) => {
    onChange(
      linkedWords.map((word, i) => (i === idx ? { ...word, value } : word)),
    )
  }

  return (
    <>
      <div className={`${styles.formGroup} ${styles.dynamicFields}`}>
        <label>LinkedWords</label>
        {linkedWords.map((linkedWord, index) => (
          <div key={index} className={styles.dynamicField}>
            <span
              className={styles.badge}
              style={{
                backgroundColor: `var(--${linkedWord.type.color}-shadow)`,
              }}
            >
              {linkedWord.type.name}
            </span>
            <input
              type="text"
              value={linkedWord.value}
              onChange={(e) => handleLinkedWordChange(index, e.target.value)}
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
                className={styles.badge}
                style={{
                  backgroundColor: `var(--${type.color}-shadow)`,
                }}
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
    </>
  )
}
