import { WordWithDetails } from '@/types'
import styles from './ExamplesList.module.css'

interface Props {
  examples: WordWithDetails['examples']
}

export default function ExamplesList({ examples }: Props) {
  if (!examples || examples.length === 0) return null

  return (
    <ul className={styles.list}>
      {examples.map((example, index) => (
        <li key={index}>
          <div className={styles.badge}></div>
          <p>{example}</p>
        </li>
      ))}
    </ul>
  )
}
