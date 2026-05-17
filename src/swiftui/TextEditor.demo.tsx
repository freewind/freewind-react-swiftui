import type { FC } from 'react'
import { TextEditor, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'

export const TextEditorDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础多行输入">
        <TextEditor text={{ value: '多行输入，后续映射 TextEditor。', setValue: () => {} }} frame={{ height: 140, maxWidth: 'infinity' }} />
      </FormSection>
      <PlaygroundSection
        title="不同高度"
        summary="展示 TextEditor 在不同高度与内容密度下的效果。"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <TextEditor text={{ value: '短内容', setValue: () => {} }} frame={{ height: 100, maxWidth: 'infinity' }} />
            <TextEditor text={{ value: '更长的内容\n第二行\n第三行', setValue: () => {} }} frame={{ height: 180, maxWidth: 'infinity' }} />
          </VStack>
        }
      />
    </VStack>
  )
}
