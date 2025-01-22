import WordForm from '@/components/newWord/Form'
import styles from './page.module.css'

export default function NewWordPage() {
  return (
    <main className={styles.page}>
      <h2 className={styles.title}>New Word</h2>
      <WordForm />
    </main>
  )
}
