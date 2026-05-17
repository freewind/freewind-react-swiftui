import type { FC } from 'react'
import { Button, FocusedValuesProvider, Text, TextField, useBinding, useFocusState, useFocusedValue, VStack } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import { FormSection } from '../FormSection'

export const TextFieldDemo: FC = () => {
  const deviceName = useBinding('freewind-mac')
  const action = useBinding('rename device')
  const focus = useFocusState<string | null>('deviceName')

  return (
    <FocusedValuesProvider values={{ textFieldFocus: focus.value }}>
      <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <FormSection title="基础输入">
          <VStack spacing={10} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <TextField
              text={deviceName}
              placeholder="input device name"
              textFieldStyle="roundedBorder"
              focused={focus}
              equals="deviceName"
              frame={{ maxWidth: 'infinity' }}
            />
            <TextField
              text={action}
              placeholder="rename device"
              textFieldStyle="roundedBorder"
              focused={focus}
              equals="action"
              onSubmit={() => focus.setValue('deviceName')}
              submitLabel="done"
              frame={{ maxWidth: 'infinity' }}
            />
            <FocusedValueText />
          </VStack>
        </FormSection>
        <PlaygroundSection
          title="不同宽度与占位"
          summary="展示 TextField 在不同占位文案与宽度下的视觉效果。"
          preview={
            <VStack spacing={10} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <TextField text={useBinding('')} placeholder="Search" textFieldStyle="roundedBorder" submitLabel="search" frame={{ width: 240 }} />
              <TextField text={useBinding('Selected File')} placeholder="Choose File" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
              <Button title="Focus deviceName" buttonStyle="bordered" onPress={() => focus.setValue('deviceName')} />
            </VStack>
          }
        />
        <ComponentPropsTable component="TextField" />
      </VStack>
    </FocusedValuesProvider>
  )
}

const FocusedValueText: FC = () => {
  const value = useFocusedValue<string>('textFieldFocus')

  return (
    <Text font="caption" foregroundStyle="secondary">
      focused: {value ?? 'none'}
    </Text>
  )
}
