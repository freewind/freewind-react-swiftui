import type { FC } from 'react'
import { inputChrome, viewStyle } from '../runtime'
import type { TextFieldProps } from '../TextField'

export const SecureField: FC<TextFieldProps> = ({ text, placeholder, textFieldStyle = 'roundedBorder', ...rest }) => {
  return (
    <input
      type="password"
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
