import { WordDTO } from '@/dto/word'
import { createClient } from '@/lib/supabase/server-client'
import { Word, WordWithDetails } from '@/types'

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

  const wordWithDetailsQuery = supabase
    .from('word')
    .select(
      `
        id,
        word,
        definition,
        jargon_definition,
        examples,
        is_marked,
        created_at,
        updated_at,
        category:category!word_category_id_fkey (
          id,
          name,
          color,
          icon
        ),
        word_links:word_link!fk_word_relation_word (
          id,
          linked_word_id,
          text_value,
          link_type:word_link_type (
            id,
            name
          )
        )
      `,
    )
    .eq('category.user_id', user?.id)
    .order(orderBy.column, { ascending: orderBy.ascending })

  // type WordWithDetailsResult = QueryData<typeof wordWithDetailsQuery>

  const { data, error } = await wordWithDetailsQuery

  if (error) {
    console.error('Error fetching categories with words:', error)
    throw new Error('Failed to fetch categories with words')
  }

  if (!data) {
    console.warn('No data found for the query')
    return []
  }

  const wordWithDetails: WordWithDetails[] = data.map((word) => ({
    id: word.id,
    word: word.word,
    definition: word.definition || [],
    jargonDefinition: word.jargon_definition || [],
    examples: word.examples || [],
    isMarked: word.is_marked || false,
    createdAt: word.created_at,
    updatedAt: word.updated_at,
    category:
      Array.isArray(word.category) && word.category.length > 0
        ? {
            id: word.category[0].id,
            name: word.category[0].name,
            color: word.category[0].color,
            icon: word.category[0].icon,
          }
        : null,
    linkedWords: Array.isArray(word.word_links)
      ? word.word_links.map((link) => ({
          id: link.id,
          linkedWordId: link.linked_word_id,
          linkTypeName:
            Array.isArray(link.link_type) && link.link_type.length > 0
              ? link.link_type[0].name
              : undefined,
          textValue: link.text_value || '',
        }))
      : [],
  }))

  // console.log('wordWithDetails:', wordWithDetails)

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
