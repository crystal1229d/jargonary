'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Word } from '@/types'
import styles from './ExamplesForm.module.css'

interface Props {
  examples: Word['examples']
  onChange: (examples: Word['examples']) => void
}

export default function ExamplesForm({ examples, onChange }: Props) {
  const handleAddField = () => {
    onChange([...examples, ''])
  }

  const handleRemoveField = (idx: number) => {
    const updatedExamples = examples.filter((_, i) => i !== idx)
    onChange(updatedExamples)
  }

  const handleInputChange = (idx: number, value: string) => {
    const updatedExamples = examples.map((example, i) =>
      i === idx ? value : example,
    )
    onChange(updatedExamples)
  }

  return (
    <div className={`${styles.formGroup} ${styles.dynamicFields}`}>
      <label>Example</label>
      {examples.map((example, index) => (
        <div key={index} className={styles.dynamicField}>
          <input
            type="text"
            value={example}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="I'll fix the bug."
          />
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={() => handleRemoveField(index)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
      <button
        type="button"
        className={styles.addBtn}
        onClick={() => handleAddField()}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}
