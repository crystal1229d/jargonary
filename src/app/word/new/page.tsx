import WordForm from '@/components/newWord/Form'
import { Category, WordLinkType } from '@/types'
import { fetchCategories } from '@/services/category'
import { fetchWordLinkTypes } from '@/services/word'
import styles from './page.module.css'

export default async function NewWordPage() {
  const categories: Category[] = await fetchCategories('name')
  const wordLinkTypes: WordLinkType[] = await fetchWordLinkTypes()

  return (
    <main className={styles.page}>
      <h2 className={styles.title}>New Word</h2>
      <WordForm categories={categories} wordLinkTypes={wordLinkTypes} />
    </main>
  )
}
