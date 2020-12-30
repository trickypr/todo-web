import { Plus } from 'react-feather'

import style from 'styles/components/addItem.module.css'

export default function AddItem({ onClick }) {
  return (
    <button className={style.button} onClick={onClick}>
      <Plus size={10} /> Add an item
    </button>
  )
}
