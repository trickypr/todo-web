import { useState } from 'react'

import styles from 'styles/AppMain.module.css'
import defaultStorage from 'public/defaultStorage.json'

import { getStorage, List, nextID, setStorage } from 'scripts/storage'
import Checkbox from 'components/Checkbox'
import AddItem from 'components/AddItem'
import ContentEditable from 'react-contenteditable'

export default function Main() {
  const [active, setActive] = useState(0)
  const [data, setData] = useState([])
  const [forceState, setForceState] = useState(false)

  const forceRerender = () => setForceState(!forceState)

  if (data.length == 0) {
    setData(getStorage())
  }

  const current: List = data[active] || defaultStorage[0]

  document.documentElement.style.setProperty('--primary-color', current.color)

  if (getStorage() != data && data.length != 0) {
    setStorage(data)
  }

  const setItemDone = (itemI: number) => {
    const newData = data
    newData[active].items[itemI].done = !newData[active].items[itemI].done
    setData(newData)
    forceRerender()
  }

  return (
    <div className={styles.main}>
      <div /> {/* Spacer for grid */}
      <div className={styles.sidebar}>
        <h2>Lists</h2>
        {data.map((list, i) => (
          <div
            className={styles.sidebarList}
            key={list.id}
            style={{ backgroundColor: list.color }}
            onClick={() => setActive(i)}
          >
            <ContentEditable
              html={list.name}
              tagName="p"
              onChange={(e) => {
                const newData = data
                newData[i].name = e.target.value
                  .replaceAll('<br>', '&nbsp;')
                  .replaceAll('&nbsp;', ' ')
                setData(newData)
                forceRerender()
              }}
            />
          </div>
        ))}
      </div>
      <div className={styles.list}>
        <h1>{current.name}</h1>

        <div className={styles.todos}>
          {current.items.map((item, i) => (
            <Checkbox
              key={item.id}
              labelText={item.name}
              checked={item.done}
              onChange={() => setItemDone(i)}
              onTextEdit={(e) => {
                const newData = data
                newData[active].items[i].name = e.target.value
                setData(newData)
                forceRerender()
              }}
            />
          ))}
          <AddItem
            onClick={() => {
              const newList = data
              newList[active].items.push({
                name: 'new',
                done: false,
                id: nextID(),
              })
              setData(newList)
              forceRerender()
            }}
          />
        </div>
      </div>
    </div>
  )
}
