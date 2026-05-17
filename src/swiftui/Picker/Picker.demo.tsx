import type { FC } from 'react'
import { Picker, Text, useBinding } from '../runtime'
import { FormSection } from '../controls'
import { PlaygroundSection } from '../demo-playground'
import { ComponentPropsTable } from '../props-table'
import {VStack} from "../VStack";

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
        title="交互状态"
        summary="展示 segmented Picker 的不同分组和选中结果。"
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
      />
      <ComponentPropsTable component="Picker" />
    </VStack>
  )
}
