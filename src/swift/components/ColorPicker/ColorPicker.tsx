import type { FC } from 'react'
import { HStack, Text, type Binding, viewStyle } from '../runtime'
import type { ViewBaseProps } from '../View'

export type ColorPickerProps = ViewBaseProps & {
  selection: Binding<string>
  title?: string
}

export const ColorPicker: FC<ColorPickerProps> = ({ selection, title, ...rest }) => {
  return (
    <HStack data-type="ColorPicker" spacing={10} {...rest}>
      {title ? <Text>{title}</Text> : null}
      <input
        type="color"
        value={selection.value}
        onChange={event => selection.setValue(event.target.value)}
        style={{
          ...viewStyle({ frame: { width: 48, height: 32 } }),
          border: 'none',
          background: 'transparent',
          padding: 0,
        }}
      />
      <Text font="caption2.monospaced" foregroundStyle="secondary">
        {selection.value}
      </Text>
    </HStack>
  )
}
