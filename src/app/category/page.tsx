import Image from 'next/image'
import Link from 'next/link'
import { fetchCategories } from '@/services/category'
import { Category } from '@/types'

import Search from '@/components/category/Search'
import Control from '@/components/category/Control'
import CategoryItem from '@/components/category/CategoryItem'
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
        <div className={styles['empty-page']}>
          <Image
            src={`/assets/images/category_white.png`}
            alt="category"
            width="222"
            height="156"
            priority={true}
          />
          <p>No categories found</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <Link href="/category/new">
            <button className={styles.button}>Create</button>
          </Link>
        </div>
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
