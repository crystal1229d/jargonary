import { WordLinkType } from '@/types'
import { Dispatch, SetStateAction, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from './LinkedWordsForm.module.css'

interface Props {
  wordLinkTypes: WordLinkType[]
}

export default function LinkedWordsForm({ wordLinkTypes }: Props) {
  const [showLinkedWordTypePicker, setShowLinkedWordTypePicker] =
    useState<boolean>(false)
  const [linkedWords, setLinkedwords] = useState<
    { type: WordLinkType; value: string }[]
  >([])

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
