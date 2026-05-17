import type { FC } from 'react'
import { HStack, Spacer, Text, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'
import { ComponentPropsTable } from './props-table'

export const SpacerDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础占位">
        <HStack padding={12} frame={{ maxWidth: 'infinity' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <Text>Leading</Text>
          <Spacer />
          <Text>Trailing</Text>
        </HStack>
      </FormSection>
      <PlaygroundSection
        title="不同 minLength"
        summary="对比默认 Spacer 与显式 minLength，便于看推挤效果。"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <HStack padding={12} frame={{ maxWidth: 'infinity' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text>default</Text>
              <Spacer />
              <Text>fill</Text>
            </HStack>
            <HStack padding={12} frame={{ maxWidth: 'infinity' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text>min 120</Text>
              <Spacer minLength={120} />
              <Text>push</Text>
            </HStack>
          </VStack>
        }
      />
      <ComponentPropsTable component="Spacer" />
    </VStack>
  )
}
