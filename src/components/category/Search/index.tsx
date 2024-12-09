import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import styles from './Search.module.css'

export default function Search() {
  return (
    <div className={styles.search}>
      <FontAwesomeIcon icon={faMagnifyingGlass} width="1.2em" height="1.2rem" />
      <input type="text" placeholder="Search a category" />
    </div>
  )
}
