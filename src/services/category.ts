import { supaBrowserClient } from '@/lib/supabase'
import { CategoryDTO } from '@/dto/category'
import { Category } from '@/types'

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supaBrowserClient.from('category').select('*')

  if (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }

  return (data || []).map(CategoryDTO.fromSnakeCase)
}
