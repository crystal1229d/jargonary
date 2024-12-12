import { fetchWordsByCategory } from '@/services/word'
import { Word } from '@/types'

export default async function CategoryDetailPage({
  params,
}: {
  params: { categoryId: string }
}) {
  const words: Word[] = await fetchWordsByCategory(params.categoryId)

  return (
    <main>
      <div>CategoryDetailPage {params.categoryId}</div>
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
