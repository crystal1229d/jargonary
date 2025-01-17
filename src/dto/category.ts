import { Category, CategoryRaw } from '@/types'

export class CategoryDTO {
  static fromSnakeCase(data: CategoryRaw): Category {
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      color: data.color,
      icon: data.icon,
      wordCount: data.word_count,
      createdAt: data.created_at,
    }
  }
}
