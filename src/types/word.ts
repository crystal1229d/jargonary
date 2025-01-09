import { Category } from './category'
import { Database } from './supabase'

export type WordRaw = Database['public']['Tables']['word']['Row']

export interface Word {
  id: string
  word: string
  definition: string[]
  jargonDefinition: string[]
  isMarked: boolean
  examples: string[]
  createdAt: string
  updatedAt: string
}

export interface WordLinkType {
  id: string
  name: string
  createdAt: string
}

export interface WordLink {
  id: string
  wordId: Word['id']
  linkedWordId: Word['id']
  linkTypeId: WordLinkType['id']
  textValue?: string | null
  createdAt: string
}

export interface WordWithDetails extends Word {
  category?: Pick<Category, 'id' | 'name' | 'color' | 'icon'> | null
  linkedWords?: Array<{
    id: WordLink['id']
    linkedWordId: WordLink['linkedWordId']
    linkTypeName?: WordLinkType['name']
    textValue?: WordLink['textValue']
  }>
}
