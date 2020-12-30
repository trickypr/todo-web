import { Check } from 'react-feather'
import ContentEditable from 'react-contenteditable'

import style from 'styles/checkbox.module.css'

const Checkbox = ({
  labelText,
  checked = false,
  onChange = () => {},
  onTextEdit = (_) => {},
}) => (
  <label className={style.container}>
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
  </label>
)

export default Checkbox
