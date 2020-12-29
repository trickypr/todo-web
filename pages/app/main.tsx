import { useState } from 'react'

import styles from '../../styles/AppMain.module.css'
import defaultStorage from './defaultStorage'

import { getStorage, setStorage } from './storage'

const isServer = () => typeof window === 'undefined';

interface List {
  color: string
  name: string
  id: number
  items: Array<{
    id: number
    name: string
    done: boolean
  }>
}

export default function Main() {
  const [active, setActive] = useState(0)
  const [data, setData] = useState([])

  console.log(data)

  if (!isServer() && data.length == 0) {
    setData(getStorage())
  }

  let current: List = defaultStorage[0]

  if (!isServer()) {
    current = data[active] || defaultStorage[0]
    document.documentElement.style.setProperty('--primary-color', current.color)

    if (getStorage() != data && data.length != 0) {
      setStorage(data)
    }
  }

  const setItemDone = (itemI: number, state: boolean) => {
    let newData = data
    console.log(newData[active].items[itemI].done)
    newData[active].items[itemI].done = !newData[active].items[itemI].done
    console.log(newData[active].items[itemI].done)
    setData(newData)
  }

  return (
    <div className={styles.main}>
      <div /> {/* Spacer for grid */}
      <div className={styles.sidebar}>
        <h2>Lists</h2>
        {data.map(list => (
          <div className={styles.sidebarList} key={list.id} style={{ backgroundColor: list.color }}>
            <p>{list.name}</p>
          </div>
        ))}
      </div>
      <div className={styles.list}>
        <h1>{current.name}</h1>

        <div className={styles.todos}>
          {
            current.items.map((item, i) => (
              <div key={item.id}>
                <input type="checkbox" name={`checkbox${item.id}`} checked={item.done} value={item.id} onChange={_ => setItemDone(i, !item.done)} />
                <label htmlFor={`todo${item.id}`}>{item.name}</label>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}