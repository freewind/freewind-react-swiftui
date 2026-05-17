import type { FC } from 'react'
import { inputChrome, type TextFieldProps, viewStyle } from '../runtime'

export const TextField: FC<TextFieldProps> = ({ text, placeholder, textFieldStyle = 'roundedBorder', ...rest }) => {
  return (
    <input
      value={text.value}
      placeholder={placeholder}
      onChange={event => text.setValue(event.target.value)}
      style={{
        ...inputChrome(textFieldStyle),
        ...viewStyle(rest),
      }}
    />
  )
}
