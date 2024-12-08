import { WordDTO } from '@/dto/word'
import { supaBrowserClient } from '@/lib/supabase'
import { Word } from '@/types'

export async function fetchWords(): Promise<Word[]> {
  const { data, error } = await supaBrowserClient.from('word').select('*')

  if (error) {
    console.error('Error fetching words:', error)
    throw new Error('Failed to fetch words')
  }

  return (data || []).map(WordDTO.fromSnakeCase)
}
