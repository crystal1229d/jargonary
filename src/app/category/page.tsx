import { fetchCategories } from '@/services/category'
import { Category } from '@/types'
import Search from '@/components/category/Search'
import Control from '@/components/category/Control'
import CategoryItem from '@/components/category/CategoryItem'
import styles from './page.module.css'

interface Props {
  searchParams: {
    sort_by?: 'name' | 'recent'
  }
}

export default async function CategoryPage({ searchParams }: Props) {
  const sortBy = searchParams.sort_by || 'name'
  const categories: Category[] = await fetchCategories(sortBy)

  return (
    <main className={styles.page}>
      <Search />
      <Control currentSort={sortBy} />

      <ul className={styles['categories-list']}>
        {categories.map((category: Category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </main>
  )
}
