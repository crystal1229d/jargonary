import { WordWithDetails } from '@/types'
import styles from './CategoryBadge.module.css'

interface Props {
  category: WordWithDetails['category']
}

export default function CategoryBadge({ category }: Props) {
  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: `var(--${category?.color}-shadow)`,
      }}
    >
      <span className={styles.icon}>{category?.icon}</span>
      <span className={`${styles.name}`}>{category?.name}</span>
    </div>
  )
}
