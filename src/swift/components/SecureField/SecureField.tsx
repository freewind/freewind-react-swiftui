import type { FC } from 'react'
import { inputChrome, viewStyle } from '../runtime'
import type { TextFieldProps } from '../TextField'
import { useEffect, useRef } from 'react'

export const SecureField: FC<TextFieldProps> = ({
  text,
  placeholder,
  textFieldStyle = 'roundedBorder',
  focused,
  equals,
  onSubmit,
  submitLabel,
  ...rest
}) => {
  const ref = useRef<HTMLInputElement | null>(null)
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
    <input
      ref={ref}
      type="password"
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
        ...inputChrome(textFieldStyle),
        ...viewStyle(rest),
      }}
    />
  )
}
