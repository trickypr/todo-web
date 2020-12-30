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
    <ContentEditable
      html={checked ? `<del>${labelText}</del>` : labelText}
      onChange={onTextEdit}
      tagName="div"
      onClick={(e) => e.preventDefault()}
    />
    <span className={style.checkmark}>
      <Check size={10} className={!checked ? style.hidden : style.show} />
    </span>
  </label>
)

export default Checkbox
