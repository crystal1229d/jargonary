import { COLOR_PALETTE } from '@/constants'
import CategoryForm from '@/components/newCategory/Form'
import styles from './page.module.css'

export default function NewWordPage() {
  return (
    <main className={styles.page}>
      <h2 className={styles.title}>New Word</h2>
      <CategoryForm ColorPalette={COLOR_PALETTE} />
    </main>
  )
}
