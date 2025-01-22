import { WordWithDetails } from '@/types'
import LinkedWordsList from '../LinkedWordsList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faBookmark } from '@fortawesome/free-solid-svg-icons'

import styles from './WordItem.module.css'
import CategoryBadge from '../CategoryBadge'
import ExamplesList from '../ExamplesList'

interface Props {
  word: WordWithDetails
}

export default function WordItem({ word }: Props) {
  return (
    <li key={word.id} className={styles.wrapper}>
      <div className={styles.header}>
        <CategoryBadge category={word.category} />

        <div className={styles.actions}>
          <button>
            <FontAwesomeIcon
              icon={faBookmark}
              className={word.isMarked ? styles.marked : ''}
            />
          </button>
          <button>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>

      <p className={styles.word}>{word.word}</p>

      {word.phoneticAlphabet && (
        <p className={styles.phonetic}>[{word.phoneticAlphabet}]</p>
      )}

      <ol className={styles.jargonDefinition}>
        {word.jargonDefinition?.map((def, index) => (
          <li key={index}>{def}</li>
        ))}
      </ol>

      <ExamplesList examples={word.examples} />

      {word.linkedWords && <hr />}

      <ol className={styles.definition}>
        {word.definition?.map((def, index) => (
          <li key={index}>{def}</li>
        ))}
      </ol>

      <LinkedWordsList linkedWords={word.linkedWords || []} />

      {word.memo && <div className={styles.memo}>{word.memo}</div>}
    </li>
  )
}
