import { Word, WordRaw } from '@/types'

export class WordDTO {
  static fromSnakeCase(data: WordRaw): Word {
    return {
      id: data.id,
      dictionaryId: data.dictionary_id,
      categoryId: data.category_id,
      word: data.word,
      definition: data.definition || [],
      jargonDefinition: data.jargon_definition || [],
      examples: data.examples || [],
      synonyms: data.synonyms || [],
      antonyms: data.antonyms || [],
      relatedWords: data.related_words || [],
      isMarked: data.is_marked || false,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }
  }
}
