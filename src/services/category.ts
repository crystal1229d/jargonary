import { supaBrowserClient } from '@/lib/supabase'
import { CategoryDTO } from '@/dto/category'
import { Category } from '@/types'

export async function fetchCategories(
  sortBy: 'name' | 'recent',
): Promise<Category[]> {
  const orderBy =
    sortBy === 'name'
      ? { column: 'name', ascending: true }
      : { column: 'updated_at', ascending: false }

  const { data, error } = await supaBrowserClient
    .from('category')
    .select('*')
    .order(orderBy.column, { ascending: orderBy.ascending })
    .range(0, 9)

  if (error) {
    console.error('Error fetching categories:', error)
    throw new Error('Failed to fetch categories')
  }

  return (data || []).map(CategoryDTO.fromSnakeCase)
}

// export async function createCategory(
//   category: CategoryForm,
// ): Promise<Category> {
//   const { data, error } = await supaBrowserClient
//     .from('category')
//     .insert([category])
//     .single()

//   if (error) {
//     console.error('Error creating category:', error)
//     throw new Error('Failed to create category')
//   }

//   return CategoryDTO.fromSnakeCase(data)
// }

export async function updateCategory(
  id: Pick<Category, 'id'>,
  updates: Partial<Category>,
): Promise<Category> {
  const { data, error } = await supaBrowserClient
    .from('category')
    .update(updates)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error updating category:', error)
    throw new Error('Failed to update category')
  }

  return CategoryDTO.fromSnakeCase(data)
}

export async function deleteCategory(id: Pick<Category, 'id'>): Promise<void> {
  const { error } = await supaBrowserClient
    .from('category')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting category:', error)
    throw new Error('Failed to delete category')
  }
}
