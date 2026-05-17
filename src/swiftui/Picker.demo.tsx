import type { FC } from 'react'
import { Picker, Text, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { EnumField, PlaygroundSection } from './demo-playground'

export const PickerDemo: FC = () => {
  const selection = useBinding<'all' | 'online' | 'offline'>('all')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <Picker
          selection={selection}
          pickerStyle="segmented"
          options={[
            { label: '全部', value: 'all' },
            { label: '在线', value: 'online' },
            { label: '离线', value: 'offline' },
          ]}
        />
      </FormSection>
      <PlaygroundSection
        title="Picker Playground"
        preview={
          <VStack spacing={8} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <Picker
              selection={selection}
              pickerStyle="segmented"
              options={[
                { label: '全部', value: 'all' },
                { label: '在线', value: 'online' },
                { label: '离线', value: 'offline' },
              ]}
            />
            <Text foregroundStyle="secondary">selection: {selection.value}</Text>
          </VStack>
        }
        form={
          <EnumField
            label="selection"
            binding={selection}
            options={[
              { label: 'all', value: 'all' },
              { label: 'online', value: 'online' },
              { label: 'offline', value: 'offline' },
            ]}
          />
        }
      />
    </VStack>
  )
}
