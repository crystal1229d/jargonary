import { WordWithDetails } from '@/types'
import styles from './WordItem.module.css'

interface Props {
  word: WordWithDetails
}

export default function WordItem({ word }: Props) {
  return (
    <li className={styles.wrapper}>
      <p className={styles.word}>{word.word}</p>

      <p className={styles.definition}>{word.definition[0]}</p>
      <p className={styles.definition}>{word.jargonDefinition[0]}</p>

      <p>{word.category?.name}</p>
      <p className={styles.mark}>{word.isMarked ? 'V' : ''}</p>

      {word.examples.length > 0 &&
        word.examples.map((example: string, index: number) => (
          <p key={index}>{example}</p>
        ))}
    </li>
  )
}
