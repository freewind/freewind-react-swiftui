import type { FC } from 'react'
import { HStack, Spacer, Text, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { NumberField, PlaygroundSection, toNumber } from './demo-playground'

export const SpacerDemo: FC = () => {
  const minLength = useBinding('60')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <HStack padding={12} frame={{ maxWidth: 'infinity' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <Text>Leading</Text>
          <Spacer />
          <Text>Trailing</Text>
        </HStack>
      </FormSection>
      <PlaygroundSection
        title="Spacer Playground"
        preview={
          <HStack padding={12} frame={{ maxWidth: 'infinity' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
            <Text>Leading</Text>
            <Spacer minLength={toNumber(minLength.value, 60)} />
            <Text>Trailing</Text>
          </HStack>
        }
        form={<NumberField label="minLength" binding={minLength} />}
      />
    </VStack>
  )
}
