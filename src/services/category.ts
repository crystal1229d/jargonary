import { CategoryDTO } from '@/dto/category'
import { Category, NewCategoryForm } from '@/types'
import { createClient } from '@/lib/supabase/server-client'

export async function fetchCategories(
  sortBy: 'name' | 'recent',
): Promise<Category[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const orderBy =
    sortBy === 'name'
      ? { column: 'name', ascending: true }
      : { column: 'updated_at', ascending: true }

  const { data, error } = await supabase
    .from('category')
    .select('*')
    .eq('user_id', user?.id)
    .order(orderBy.column, { ascending: orderBy.ascending })
    .range(0, 9)

  if (error) {
    console.error('Error fetching category:', error)
    throw new Error('Failed to fetch categories')
  }

  return (data || []).map(CategoryDTO.fromSnakeCase)
}

export async function createCategory(
  newCategory: NewCategoryForm,
): Promise<Category> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('category')
    .insert({
      user_id: user?.id,
      ...newCategory,
      word_count: 0,
    })
    .single()

  if (error) {
    console.error('Error creating category:', error)
    throw new Error('Failed to create category')
  }

  return CategoryDTO.fromSnakeCase(data)
}

export async function updateCategory(
  id: Pick<Category, 'id'>,
  updates: Partial<Category>,
): Promise<Category> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('category')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user?.id)
    .single()

  if (error) {
    console.error('Error updating category:', error)
    throw new Error('Failed to update category')
  }

  return CategoryDTO.fromSnakeCase(data)
}

export async function deleteCategory(id: Pick<Category, 'id'>): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase
    .from('category')
    .delete()
    .eq('id', id)
    .eq('user_id', user?.id)

  if (error) {
    console.error('Error deleting category:', error)
    throw new Error('Failed to delete category')
  }
}
