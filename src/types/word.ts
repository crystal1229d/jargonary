import { Database } from './supabase'
import { Category } from './category'

export type WordRow = Database['public']['Tables']['word']['Row']

export interface Word {
  id: string
  word: string
  definition: string[]
  jargonDefinition: string[]
  isMarked: boolean
  examples: string[]
  phoneticAlphabet: string
  memo: string[]
  createdAt: string
  updatedAt: string
}

export interface WordLinkType {
  id: string
  name: string
  color: string
}

export interface WordLink {
  id: string
  wordId: Word['id']
  linkedWordId: Word['id']
  linkTypeId: WordLinkType['id']
  textValue?: string | null
  linkedWord?: Pick<Word, 'id' | 'word' | 'definition'> | null
}

export interface WordWithDetails extends Word {
  category?: Pick<Category, 'id' | 'name' | 'color' | 'icon'> | null
  linkedWords?: LinkedWord[]
}

export interface LinkedWord {
  id: WordLink['id']
  linkTypeName?: WordLinkType['name']
  linkTypeColor?: WordLinkType['color']
  linkedWord?: Pick<Word, 'id' | 'word' | 'definition'>
  textValue?: WordLink['textValue']
}
