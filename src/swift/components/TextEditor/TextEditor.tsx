import type { FC } from 'react'
import { inputChrome, viewStyle } from '../runtime'
import type { Binding } from '../runtime'
import type { ViewBaseProps } from '../View'

export type TextEditorProps = ViewBaseProps & {
  text: Binding<string>
}


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
