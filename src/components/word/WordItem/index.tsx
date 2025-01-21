import { WordWithDetails } from '@/types'
import styles from './WordItem.module.css'
import LinkedWordsList from '../LinkedWordsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen'

interface Props {
  word: WordWithDetails
}

export default function WordItem({ word }: Props) {
  return (
    <li key={word.id} className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.word}>{word.word}</p>
        <div className={styles.actions}>
          <button>
            <FontAwesomeIcon icon={faPen} width="1rem" height="1rem" />
          </button>
          <button>
            <FontAwesomeIcon icon={faTrash} width="1rem" height="1rem" />
          </button>
        </div>
      </div>

      {word.phoneticAlphabet && <p>[{word.phoneticAlphabet}]</p>}
      <p className={styles.definition}>
        {word.definition?.join(', ') || 'No definition'}
      </p>
      <p className={styles.definition}>
        {word.jargonDefinition?.join(', ') || 'No jargon definition'}
      </p>

      <p className={styles.category}>
        Category: {word.category?.name || 'Uncategorized'}
      </p>
      <p className={styles.mark}>{word.isMarked ? '⭐ Marked' : ''}</p>

      {word.examples?.map((example, index) => (
        <p key={index} className={styles.example}>
          {example}
        </p>
      ))}

      <hr />

      <LinkedWordsList linkedWords={word.linkedWords || []} />

      <div className={styles.memo}>{word.memo}</div>
    </li>
  )
}
