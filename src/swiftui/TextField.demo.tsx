import type { FC } from 'react'
import { TextField, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'
import { ComponentPropsTable } from './props-table'

export const TextFieldDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础输入">
        <VStack spacing={10} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <TextField text={{ value: 'freewind-mac', setValue: () => {} }} placeholder="input device name" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
          <TextField text={{ value: 'rename device', setValue: () => {} }} placeholder="rename device" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="不同宽度与占位"
        summary="展示 TextField 在不同占位文案与宽度下的视觉效果。"
        preview={
          <VStack spacing={10} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <TextField text={{ value: '', setValue: () => {} }} placeholder="Search" textFieldStyle="roundedBorder" frame={{ width: 240 }} />
            <TextField text={{ value: 'Selected File', setValue: () => {} }} placeholder="Choose File" textFieldStyle="roundedBorder" frame={{ maxWidth: 'infinity' }} />
          </VStack>
        }
      />
      <ComponentPropsTable component="TextField" />
    </VStack>
  )
}
