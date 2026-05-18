import type { FC } from 'react'
import { Button } from '../Button'
import type { Binding } from '../runtime'
import type { ViewBaseProps } from '../View'

export type PasteButtonProps = ViewBaseProps & {
  text?: Binding<string>
  title?: string
  onPaste?: (value: string) => void
}

export const PasteButton: FC<PasteButtonProps> = ({ text, title = '粘贴', onPaste, ...rest }) => {
  return (
    <Button data-type="PasteButton"
      title={title}
      buttonStyle="bordered"
      onPress={async () => {
        const value = await navigator.clipboard.readText().catch(() => '')
        if (text) {
          text.setValue(value)
        }
        onPaste?.(value)
      }}
      {...rest}
    />
  )
}
