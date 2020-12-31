import { Plus } from 'react-feather'

import styles from 'styles/app/addList.module.css'

export default function AddList({ onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      <Plus size={10} /> New List
    </button>
  )
}
