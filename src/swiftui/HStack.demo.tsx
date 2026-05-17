import type { FC } from 'react'
import { HStack, Text, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { NumberField, PlaygroundSection, toNumber } from './demo-playground'

export const HStackDemo: FC = () => {
  const spacing = useBinding('12')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <HStack spacing={12} padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <Text>A</Text>
          <Text>B</Text>
          <Text>C</Text>
        </HStack>
      </FormSection>
      <PlaygroundSection
        title="HStack Playground"
        preview={
          <HStack
            spacing={toNumber(spacing.value, 12)}
            padding={12}
            frame={{ maxWidth: 'infinity' }}
            background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}
          >
            <Text>A</Text>
            <Text>B</Text>
            <Text>C</Text>
          </HStack>
        }
        form={<NumberField label="spacing" binding={spacing} />}
      />
    </VStack>
  )
}
