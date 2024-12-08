import { fetchCategories } from '@/services/category'
import { Category } from '@/types'
import CategoryItem from '@/components/category/CategoryItem'
import styles from './page.module.css'

export default async function CategoryPage() {
  const categories: Category[] = await fetchCategories()

  return (
    <main className={styles.page}>
      {/* <div className={styles.nav}>
        <button>Back</button>
        <div>
          <span>Categories</span>
        </div>
        <button>More</button>
      </div> */}

      <div className={styles.search}>
        <button>Search</button>
        <input type="text" />
      </div>

      <ul className={styles['categories-list']}>
        {categories.map((category: Category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </main>
  )
}
