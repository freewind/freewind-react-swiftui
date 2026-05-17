import type { FC } from 'react'
import { inputChrome, type TextEditorProps, viewStyle } from '../runtime'

export const TextEditor: FC<TextEditorProps> = ({ text, ...rest }) => {
  return (
    <textarea
      value={text.value}
      onChange={event => text.setValue(event.target.value)}
      style={{
        ...inputChrome('roundedBorder'),
        ...viewStyle(rest),
        resize: 'none',
        minHeight: 120,
      }}
    />
  )
}
