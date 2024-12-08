import { fetchWords } from '@/services/word'
import { Word } from '@/types'
import styles from './page.module.css'

export default async function WordPage() {
  const words: Word[] = await fetchWords()

  return (
    <main className={styles.page}>
      <div className={styles.search}>
        <button>Search</button>
        <input type="text" />
      </div>

      <ul className={styles['words-list']}>
        {words.map((word: Word) => (
          <li key={word.id}>
            {word.word} - {word.definition[0]}
          </li>
        ))}
      </ul>
    </main>
  )
}
