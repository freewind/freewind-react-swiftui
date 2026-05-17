import type { FC } from 'react'
import { DropArea, Text, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { BoolField, PlaygroundSection, toBoolBinding } from './demo-playground'

export const DropAreaDemo: FC = () => {
  const targeted = useBinding<'true' | 'false'>('false')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <DropArea
          padding={12}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          frame={{ maxWidth: 'infinity' }}
        >
          <Text>DropArea mock，对应 SwiftUI `onDrop` 语义。</Text>
        </DropArea>
      </FormSection>
      <PlaygroundSection
        title="DropArea Playground"
        preview={
          <DropArea
            isTargeted={{
              value: toBoolBinding(targeted),
              setValue: next => targeted.setValue(next ? 'true' : 'false'),
            }}
            padding={12}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
          >
            <Text>DropArea mock，对应 SwiftUI `onDrop` 语义。</Text>
          </DropArea>
        }
        form={<BoolField label="isTargeted" binding={targeted} />}
      />
    </VStack>
  )
}
