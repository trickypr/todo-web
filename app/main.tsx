import { useState } from 'react'

import styles from 'styles/AppMain.module.css'
import defaultStorage from 'public/defaultStorage.json'

import { getStorage, List, nextID, setStorage } from 'scripts/storage'
import ContentEditable from 'react-contenteditable'
import AddList from './AddList'
import ListDisplay from './ListDisplay'

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

        <AddList
          onClick={(e) =>
            setData([
              ...data,
              { name: 'New list', color: '#1FB08D', id: nextID(), items: [] },
            ])
          }
        />
      </div>
      <ListDisplay
        current={current}
        data={data}
        setData={setData}
        forceRerender={forceRerender}
        active={active}
      />
    </div>
  )
}
