import AddItem from 'components/AddItem'
import Checkbox from 'components/Checkbox'
import { nextID } from 'scripts/storage'
import styles from 'styles/app/listDisplay.module.css'

export default function ListDisplay({
  current,
  data,
  setData,
  forceRerender,
  active,
}) {
  const setItemDone = (itemI: number) => {
    const newData = data
    newData[active].items[itemI].done = !newData[active].items[itemI].done
    setData(newData)
    forceRerender()
  }

  return (
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
  )
}
