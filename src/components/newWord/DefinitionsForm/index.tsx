'use client'

import { WordDefinition } from '@/types'
import { generateTempId } from '@/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'
import styles from './DefinitionsForm.module.css'

interface Props {
  definitions: WordDefinition[]
  onChange: (definitions: WordDefinition[]) => void
}

export default function DefinitionsForm({ definitions, onChange }: Props) {
  const handleDefinitionChange = (id: string, value: string) => {
    const updatedDefs = definitions.map((def) =>
      def.id === id ? { ...def, definition: value } : def,
    )
    onChange(updatedDefs)
  }

  const handleAddDefinition = () => {
    const newDefs: WordDefinition = {
      id: generateTempId(),
      definition: '',
      isJargon: false,
      order: definitions.length + 1,
    }
    onChange([...definitions, newDefs])
  }

  const handleRemoveDefinition = (id: string) => {
    const updatedDefs = definitions.filter((def) => def.id !== id)
    onChange(updatedDefs)
  }

  const handleToggleJargon = (id: string) => {
    const updatedDefs = definitions.map((def) =>
      def.id === id ? { ...def, isJargon: !def.isJargon } : def,
    )
    onChange(updatedDefs)
  }

  return (
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
  )
}
