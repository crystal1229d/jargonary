import Image from 'next/image'
import Link from 'next/link'
import { Category } from '@/types'
import styles from './CategoryItem.module.css'

interface Props {
  category: Category
}

export default function CategoryItem({ category }: Props) {
  return (
    <li className={styles.wrapper}>
      <Link href={`/category/${category.id}`}>
        <div className={styles['image-section']}>
          <Image
            src={`/assets/images/category_${category.color}.png`}
            alt="category"
            width="222"
            height="168"
            priority={true}
          />
        </div>
        <div className={styles['info-section']}>
          <div>
            <span className={styles.icon}>{category.icon}</span>
          </div>
          <div>
            <span
              className={`${styles.name}`}
              style={{ backgroundColor: `var(--${category.color}-shadow)` }}
            >
              {category.name}
            </span>
          </div>
          <span className={styles.words}>{category.wordCount} words</span>
        </div>
      </Link>
    </li>
  )
}
