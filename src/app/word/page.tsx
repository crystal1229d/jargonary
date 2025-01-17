import { WordWithDetails } from '@/types'
import { fetchWords } from '@/services/word'
import Search from '@/components/common/Search'
import WordItem from '@/components/word/WordItem'
import NoItem from '@/components/common/NoItem'
import styles from './page.module.css'

interface Props {
  searchParams: Promise<{
    sort_by?: 'name' | 'recent'
  }>
}

export default async function WordPage({ searchParams }: Props) {
  const params = await searchParams
  const sortBy = params.sort_by || 'name'
  const words: WordWithDetails[] = await fetchWords(sortBy)
  console.log(words)
  return (
    <main className={styles.page}>
      <Search />
      <div>
        <button>Sort By</button>
        <button>Filter</button>
      </div>

      {words.length === 0 ? (
        <NoItem />
      ) : (
        <ul className={styles['words-list']}>
          {words.map((word: WordWithDetails) => (
            <WordItem key={word.id} word={word} />
          ))}
        </ul>
      )}
    </main>
  )
}
