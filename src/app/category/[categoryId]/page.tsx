import { fetchWordsByCategory } from '@/services/word'
import { Word } from '@/types'

interface Props {
  params: {
    categoryId: string
  }
}

export default async function CategoryDetailPage({ params }: Props) {
  const words: Word[] = await fetchWordsByCategory(params.categoryId)

  return (
    <main>
      <div>CategoryDetailPage {params.categoryId}</div>
      <div></div>
      <ul>
        {words.map((word) => (
          <li key={word.id}>
            {word.word} - {word.definition[0]}
          </li>
        ))}
      </ul>
    </main>
  )
}
