import { fetchWordsByCategory } from '@/services/word'
import { Word } from '@/types'

interface Props {
  params: Promise<{ categoryId: string }>
}

export default async function CategoryDetailPage({ params }: Props) {
  const resolvedParams = await params
  const words: Word[] = await fetchWordsByCategory(resolvedParams.categoryId)

  return (
    <main>
      <div>CategoryDetailPage {resolvedParams.categoryId}</div>
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
