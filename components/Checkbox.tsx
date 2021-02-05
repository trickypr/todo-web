import { Check } from 'react-feather'
import ContentEditable from 'react-contenteditable'

import style from 'styles/checkbox.module.css'
import { useEffect, useRef, useState } from 'react'

const Checkbox = ({
  labelText,
  checked = false,
  onChange = () => {},
  onTextEdit = (_) => {},
  onDelete,
  indent,
  index,
}) => {
  const [contextMenu, setContextMenu] = useState(false)
  const container = useRef(null)

  useEffect(() => {
    const e = (e) => {
      if (container.current && !container.current.contains(e.target))
        setContextMenu(false)
    }

    document.addEventListener('click', e)
    return () => document.removeEventListener('click', e)
  })

  return (
    <label
      className={style.container}
      ref={container}
      onContextMenu={(e) => {
        e.preventDefault()
        setContextMenu(!contextMenu)
      }}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <ContentEditable
          html={checked ? `<del>${labelText}</del>` : labelText}
          onChange={onTextEdit}
          tagName="div"
        />
      </div>
      <span className={style.checkmark}>
        <Check size={10} className={!checked ? style.hidden : style.show} />
      </span>
      {contextMenu && (
        <div
          className={style.contextMenu}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <div onClick={indent} className={index == 0 && style.disabled}>
            Indent
          </div>
          <div onClick={onDelete}>Delete</div>
        </div>
      )}
    </label>
  )
}

export default Checkbox
