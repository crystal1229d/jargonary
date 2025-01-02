import { ColorPalette } from '@/constants'
import CategoryForm from '@/components/newCategory/Form'
import styles from './page.module.css'

export default function NewCategoryPage() {
  return (
    <main className={styles.page}>
      <h2 className={styles.title}>New Category</h2>
      <CategoryForm ColorPalette={ColorPalette} />
    </main>
  )
}
