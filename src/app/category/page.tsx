import { fetchCategories } from '@/services/category'
import { Category } from '@/types'

import Search from '@/components/common/Search'
import Control from '@/components/category/Control'
import CategoryItem from '@/components/category/CategoryItem'
import NoItem from '@/components/common/NoItem'
import styles from './page.module.css'

interface Props {
  searchParams: Promise<{
    sort_by?: 'name' | 'recent'
  }>
}

export default async function CategoryPage({ searchParams }: Props) {
  const params = await searchParams
  const sortBy = params.sort_by || 'name'

  const categories: Category[] = await fetchCategories(sortBy)

  return (
    <main className={styles.page}>
      <Search />
      <Control currentSort={sortBy} />

      {categories.length === 0 ? (
        <NoItem />
      ) : (
        <ul className={styles['categories-list']}>
          {categories.map((category: Category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </ul>
      )}
    </main>
  )
}
