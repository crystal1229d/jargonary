import { LinkedWord } from '@/types'
import styles from './LinkedWordsList.module.css'

interface Props {
  linkedWords: LinkedWord[] | []
}

export default function LinkedWordsList({ linkedWords }: Props) {
  return (
    <ul className={styles.wrapper}>
      {linkedWords?.map((linkedWord) => (
        <li key={linkedWord.id} className={styles.linkedWord}>
          <span
            className={styles.badge}
            style={{
              backgroundColor: `var(--${linkedWord.linkTypeColor}-shadow)`,
            }}
          >
            {linkedWord.linkTypeName}
          </span>
          {linkedWord.linkedWord?.word}
        </li>
      ))}
    </ul>
  )
}
