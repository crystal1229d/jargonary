import { fetchCategories } from '@/services/category'
import { Category } from '@/types'

import Search from '@/components/category/Search'
import Control from '@/components/category/Control'
import CategoryItem from '@/components/category/CategoryItem'
import styles from './page.module.css'

export default async function CategoryPage() {
  const categories: Category[] = await fetchCategories()

  return (
    <main className={styles.page}>
      <Search />
      <Control />

      <ul className={styles['categories-list']}>
        {categories.map((category: Category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </main>
  )
}
