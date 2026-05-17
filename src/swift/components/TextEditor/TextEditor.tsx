import { useEffect, useRef, type FC } from 'react'
import { inputChrome, viewStyle } from '../runtime'
import type { Binding } from '../runtime'
import type { ViewBaseProps } from '../View'

export type TextEditorProps = ViewBaseProps & {
  text: Binding<string>
  focused?: Binding<string | null>
  equals?: string
}


export const TextEditor: FC<TextEditorProps> = ({ text, focused, equals, ...rest }) => {
  const ref = useRef<HTMLTextAreaElement | null>(null)
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
    <textarea
      ref={ref}
      value={text.value}
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
      style={{
        ...inputChrome('roundedBorder'),
        ...viewStyle(rest),
        resize: 'none',
        minHeight: 120,
      }}
    />
  )
}
