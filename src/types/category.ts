import { Database } from './supabase'

export type CategoryRaw = Database['public']['Tables']['category']['Row']

export interface Category {
  id: string
  dictionaryId: string
  name: string
  color: string
  icon: string
  wordCount: number
  createdAt: string
}

export type NewCategoryForm = Pick<Category, 'name' | 'color' | 'icon'>
