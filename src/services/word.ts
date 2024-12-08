import { WordDTO } from '@/dto/word'
import { supaBrowserClient } from '@/lib/supabase'
import { Word } from '@/types'

export async function fetchWords(): Promise<Word[]> {
  const { data, error } = await supaBrowserClient
    .from('word')
    .select('*')
    .order('word', { ascending: true })
  // .range(0, 9) // 첫 10개 (페이징)

  if (error) {
    console.error('Error fetching words:', error)
    throw new Error('Failed to fetch words')
  }

  return (data || []).map(WordDTO.fromSnakeCase)
}

export async function fetchWordsByCategory(
  categoryId: string,
): Promise<Word[]> {
  const { data, error } = await supaBrowserClient
    .from('word')
    .select('*')
    .eq('category_id', categoryId)
    .order('word', { ascending: true })
  // .range(0, 9) // 첫 10개 (페이징)

  if (error) {
    console.error('Error fetching words by category:', error)
    throw new Error('Failed to fetch words by category')
  }

  return (data || []).map(WordDTO.fromSnakeCase)
}
