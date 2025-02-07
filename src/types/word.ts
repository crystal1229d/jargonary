import { Database } from './supabase'
import { Category } from './category'

/* DB */
type TABLE = Database['public']['Tables']

export type WordRow = TABLE['word']['Row']
export type WordDefinitionRow = TABLE['word_definition']['Row']
export type WordLinkTypeRow = TABLE['word_link_type']['Row']

/* UI */
export interface Word {
  id: string
  word: string
  definition: WordDefinition[]
  isMarked: boolean
  examples: string[]
  ipa: string
  memo: string
  createdAt: string
  updatedAt: string
}

export interface WordDefinition {
  id: string
  definition: string
  isJargon: boolean
  order: number
}

export interface WordLinkType {
  id: string
  name: string
  color: string
}

export interface WordLink {
  id: string
  wordId: Word['id']
  linkedWordId?: Word['id']
  linkTypeId: WordLinkType['id']
  textValue?: string | null
  linkedWord?:
    | (Pick<Word, 'id' | 'word'> & { definition: WordDefinition[] })
    | null
}

export interface WordWithDetails extends Word {
  category?: Pick<Category, 'id' | 'name' | 'color' | 'icon'> | null
  linkedWords?: LinkedWord[]
}

/* UI */
export interface LinkedWord {
  id: WordLink['id']
  linkTypeName?: WordLinkType['name']
  linkTypeColor?: WordLinkType['color']
  linkedWord?: Pick<Word, 'id' | 'word'> & { definition: WordDefinition[] }
  textValue?: WordLink['textValue']
}

export interface LinkedWordInput {
  type: WordLinkType
  textValue: string
  linkedWordId?: string
}

export interface NewWord {
  categoryId: Category['id']
  word: Word['word']
  ipa?: Word['ipa']
  definitions: WordDefinition[]
  isMarked: Word['isMarked']
  examples: Word['examples'] | []
  linkedWords: string[]
  memo?: Word['memo']
}
