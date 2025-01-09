import Image from 'next/image'
import styles from './NoItem.module.css'

export default function NoItem() {
  return (
    <div className={styles['empty-page']}>
      <Image
        src={`/assets/images/category_white.png`}
        alt="category"
        width="148"
        height="104"
        priority={true}
      />
      <p>No categories found</p>
    </div>
  )
}
