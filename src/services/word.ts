import { WordDTO } from '@/dto/word'
import { createClient } from '@/lib/supabase/server-client'
import { Word, WordLinkType, WordWithDetails } from '@/types'

export async function fetchWords(
  sortBy: 'name' | 'recent',
): Promise<WordWithDetails[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const orderBy =
    sortBy === 'name'
      ? { column: 'word', ascending: true }
      : { column: 'updated_at', ascending: true }

  const { data, error } = await supabase.rpc('fetch_words', {
    user_id: user?.id,
    order_by_column: orderBy.column,
    is_ascending: orderBy.ascending,
  })

  if (error) {
    throw new Error('Failed to fetch categories with words')
  }

  if (!data) {
    return []
  }

  const wordWithDetails: WordWithDetails[] = data.map(
    (word: WordWithDetails) => ({
      ...word,
      category: word.category || null,
      linkedWords: word.linkedWords?.map((link) => ({
        ...link,
        linkedWord: link.linkedWord || null,
      })),
    }),
  )

  return wordWithDetails
}

export async function fetchWordsByCategory(
  categoryId: string,
): Promise<Word[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('word')
    .select('*')
    .eq('user_id', user?.id)
    .eq('category_id', categoryId)
    .order('word', { ascending: true })
    .range(0, 29)

  if (error) {
    console.error('Error fetching words by category:', error)
    throw new Error('Failed to fetch words by category')
  }

  return (data || []).map(WordDTO.fromSnakeCase)
}

export async function fetchWordLinkTypes(): Promise<WordLinkType[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('word_link_type')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    throw new Error('Failed to fetch Word Link Types')
  }

  return data
}
