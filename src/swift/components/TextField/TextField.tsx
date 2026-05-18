import { useContext, useEffect, useRef, type FC } from 'react'
import { inputChrome, parentStackAxisContext, viewStyle } from '../runtime'
import type { Binding, TextFieldStyleToken } from '../runtime'
import type { ViewBaseProps } from '../View'

export type TextFieldProps = ViewBaseProps & {
  placeholder?: string
  text: Binding<string>
  textFieldStyle?: TextFieldStyleToken
  focused?: Binding<string | null>
  equals?: string
  onSubmit?: () => void
  submitLabel?: 'done' | 'go' | 'search' | 'send' | 'next' | 'enter'
}


export const TextField: FC<TextFieldProps> = ({
  text,
  placeholder,
  textFieldStyle = 'roundedBorder',
  focused,
  equals,
  onSubmit,
  submitLabel,
  controlSize = 'regular',
  tint,
  ...rest
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const parentStackAxis = useContext(parentStackAxisContext)
  const isFocused = focused ? focused.value === (equals ?? null) : false

  useEffect(() => {
    if (isFocused) {
      ref.current?.focus()
      return
    }
    if (ref.current && document.activeElement === ref.current) {
      ref.current.blur()
    }
  }, [isFocused])

  return (
    <input data-type="TextField"
      ref={ref}
      value={text.value}
      placeholder={placeholder}
      onChange={event => text.setValue(event.target.value)}
      onFocus={() => {
        if (!focused) {
          return
        }
        focused.setValue(equals ?? null)
      }}
      onBlur={() => {
        if (!focused) {
          return
        }
        focused.setValue(null)
      }}
      onKeyDown={event => {
        if (event.key === 'Enter') {
          onSubmit?.()
        }
      }}
      enterKeyHint={submitLabel}
      style={{
        ...inputChrome(textFieldStyle, controlSize, tint),
        ...viewStyle(rest, parentStackAxis),
      }}
    />
  )
}
