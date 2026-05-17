import type { ReactNode } from 'react'
import { Button } from '../Button'
import { HStack } from '../HStack'
import type { Binding } from '../runtime'
import { Text } from '../Text'
import { VStack } from '../VStack'
import type { ViewBaseProps } from '../View'

export type PickerOption<T extends string | number> = {
  label: string
  value: T
}

export type PickerProps<T extends string | number> = ViewBaseProps & {
  selection: Binding<T>
  options: PickerOption<T>[]
  pickerStyle?: 'segmented'
  label?: ReactNode
}


export const Picker = <T extends string | number>({
  selection,
  options,
  pickerStyle = 'segmented',
  label,
  ...rest
}: PickerProps<T>) => {
  if (pickerStyle !== 'segmented') {
    throw new Error(`Unsupported pickerStyle: ${pickerStyle}`)
  }

  return (
    <VStack spacing={6} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      {label ?? (
        <Text font="caption" foregroundStyle="secondary">
          {String(selection.value)}
        </Text>
      )}
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
    </VStack>
  )
}
