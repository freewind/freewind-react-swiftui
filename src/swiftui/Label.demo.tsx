import type { FC } from 'react'
import { Label, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection, StringField } from './demo-playground'

export const LabelDemo: FC = () => {
  const title = useBinding('photo file')
  const systemImage = useBinding('photo')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={10} alignment="leading">
          <Label title="photo file" systemImage="photo" />
          <Label title="document file" systemImage="doc" />
          <Label title="pinned item" systemImage="pin.fill" />
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="Label Playground"
        preview={<Label title={title.value} systemImage={systemImage.value} />}
        form={
          <>
            <StringField label="title" binding={title} />
            <StringField label="systemImage" binding={systemImage} />
          </>
        }
      />
    </VStack>
  )
}
