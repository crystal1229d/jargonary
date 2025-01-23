import WordForm from '@/components/newWord/Form'
import styles from './page.module.css'
import { Category } from '@/types'
import { fetchCategories } from '@/services/category'

export default async function NewWordPage() {
  const categories: Category[] = await fetchCategories('name')

  return (
    <main className={styles.page}>
      <h2 className={styles.title}>New Word</h2>
      <WordForm categories={categories} />
    </main>
  )
}
