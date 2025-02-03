import { WordWithDetails } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faBookmark } from '@fortawesome/free-solid-svg-icons'
import CategoryBadge from '../CategoryBadge'
import ExamplesList from '../ExamplesList'
import LinkedWordsList from '../LinkedWordsList'

import styles from './WordItem.module.css'

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

      {word.ipa && <p className={styles.ipa}>[{word.ipa}]</p>}

      <ol className={styles.definition}>
        {word.definition?.map((def) => (
          <li key={def.id} className={def.isJargon ? styles.jargon : undefined}>
            {def.definition}
          </li>
        ))}
      </ol>

      <ExamplesList examples={word.examples} />

      {word.linkedWords && <hr />}

      <LinkedWordsList linkedWords={word.linkedWords || []} />

      {word.memo && <div className={styles.memo}>{word.memo}</div>}
    </li>
  )
}
