import type { FC } from 'react'
import { inputChrome, viewStyle } from '../runtime'
import type { Binding, TextFieldStyleToken } from '../runtime'
import type { ViewBaseProps } from '../View'

export type TextFieldProps = ViewBaseProps & {
  placeholder?: string
  text: Binding<string>
  textFieldStyle?: TextFieldStyleToken
}


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
