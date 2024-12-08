import styles from './Header.module.css'
import Navbar from '../Navbar'
import Logo from '@/components/common/Logo'

export default function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Navbar />
    </header>
  )
}
