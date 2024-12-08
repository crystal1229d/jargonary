import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Jargonary</h1>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.navLink}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className={styles.navLink}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={styles.navLink}>
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>

        <p className={styles.footerText}>
          &copy; {new Date().getFullYear()} Jargonary. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
