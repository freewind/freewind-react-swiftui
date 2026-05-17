import type { FC } from 'react'
import { TextEditor, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { NumberField, PlaygroundSection, StringField, toNumber } from './demo-playground'

export const TextEditorDemo: FC = () => {
  const text = useBinding('多行输入，后续映射 TextEditor。')
  const height = useBinding('140')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <TextEditor text={text} frame={{ height: 140, maxWidth: 'infinity' }} />
      </FormSection>
      <PlaygroundSection
        title="TextEditor Playground"
        preview={<TextEditor text={text} frame={{ height: toNumber(height.value, 140), maxWidth: 'infinity' }} />}
        form={
          <>
            <StringField label="text" binding={text} />
            <NumberField label="frame.height" binding={height} />
          </>
        }
      />
    </VStack>
  )
}
