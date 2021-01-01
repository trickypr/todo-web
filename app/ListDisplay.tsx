import { useState } from 'react'

import { Edit, Trash, Check } from 'react-feather'

import AddItem from 'components/AddItem'
import Checkbox from 'components/Checkbox'
import { nextID } from 'scripts/storage'
import styles from 'styles/app/listDisplay.module.css'
import { colors } from './colors'

export default function ListDisplay({
  current,
  data,
  setData,
  forceRerender,
  active,
}) {
  const [dropdownShow, setDropdownShow] = useState(false)
  const toggleDropdown = () => setDropdownShow(!dropdownShow)

  const setItemDone = (itemI: number) => {
    const newData = data
    newData[active].items[itemI].done = !newData[active].items[itemI].done
    setData(newData)
    forceRerender()
  }

  return (
    <div className={styles.list}>
      <div className={styles.heading}>
        <h1>{current.name}</h1>
        <div className={styles.dropdown}>
          <button onClick={toggleDropdown}>
            <Edit />
          </button>
          {dropdownShow && (
            <div className={styles.dropdownContents}>
              <h3>Color</h3>

              <div className={styles.selector}>
                {colors
                  .map((color) => `#${color}`)
                  .map((color) => (
                    <div
                      key={color}
                      style={{ backgroundColor: color }}
                      className={styles.colorSquare}
                      onClick={() => {
                        const newData = data
                        newData[active].color = color
                        setData(newData)
                        forceRerender()
                      }}
                    >
                      {color.toLowerCase() ==
                        data[active].color.toLowerCase() && <Check size={16} />}
                    </div>
                  ))}
              </div>

              <button
                onClick={() => {
                  let newData = data
                  newData.splice(active, 1)
                  setData(newData)
                  forceRerender()
                }}
              >
                <Trash size={10} /> Delete list
              </button>
            </div>
          )}
        </div>
      </div>

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
  )
}
