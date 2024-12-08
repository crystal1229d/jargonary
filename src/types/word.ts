import { Database } from './supabase'

export type WordRaw = Database['public']['Tables']['word']['Row']

export interface Word {
  id: string
  dictionaryId: string
  categoryId: string
  word: string
  definition: string[]
  jargonDefinition: string[]
  examples: string[]
  synonyms: string[]
  antonyms: string[]
  relatedWords: Word['id'][]
  isMarked: boolean
  createdAt: string
  updatedAt: string
}
