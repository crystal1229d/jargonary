import Image from 'next/image'
import styles from './page.module.css'

export default function NewCategoryPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>New Category</h1>

      <div className={styles.preview}>
        <div className={styles['preview-image']}>
          <Image
            src={`/assets/images/category_white.png`}
            alt="category"
            width="222"
            height="156"
            priority={true}
          />
        </div>
        <div className={styles['preview-info']}>
          <div>
            <span className={styles.icon}>ico</span>
          </div>
          <div>
            <span
              className={`${styles.name}`}
              style={{ backgroundColor: `var(--white-shadow)` }}
            >
              name
            </span>
          </div>
          <span className={styles.words}>0 words</span>
        </div>
      </div>

      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="categoryName">Name</label>
          <input
            type="text"
            id="categoryName"
            placeholder="Enter category name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="categoryIcon">Icon</label>
          <div id="categoryIcon" className={styles.selector}>
            Select an icon
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="categoryColor">Color</label>
          <div id="categoryColor" className={styles.selector}>
            Select a color
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={styles.createButton}>
            Create
          </button>
        </div>
      </form>
    </main>
  )
}
