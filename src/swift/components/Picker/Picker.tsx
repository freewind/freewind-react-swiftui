import { Button } from '../Button'
import { HStack } from '../HStack'
import type { Binding } from '../runtime'
import type { ViewBaseProps } from '../View'

export type PickerOption<T extends string | number> = {
  label: string
  value: T
}

export type PickerProps<T extends string | number> = ViewBaseProps & {
  selection: Binding<T>
  options: PickerOption<T>[]
  pickerStyle?: 'segmented'
}


export const Picker = <T extends string | number>({
  selection,
  options,
  pickerStyle = 'segmented',
  ...rest
}: PickerProps<T>) => {
  if (pickerStyle !== 'segmented') {
    throw new Error(`Unsupported pickerStyle: ${pickerStyle}`)
  }

  return (
    <HStack
      spacing={4}
      padding={4}
      background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 10 } }}
      {...rest}
    >
      {options.map(option => {
        const selected = selection.value === option.value

        return (
          <Button
            key={String(option.value)}
            title={option.label}
            buttonStyle={selected ? 'borderedProminent' : 'plain'}
            controlSize="small"
            onPress={() => selection.setValue(option.value)}
            frame={{ maxWidth: 'infinity' }}
          />
        )
      })}
    </HStack>
  )
}
