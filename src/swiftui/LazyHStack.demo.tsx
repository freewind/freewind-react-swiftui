import type { FC } from 'react'
import { LazyHStack, ScrollView, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { NumberField, PlaygroundSection, toNumber } from './demo-playground'
import { Chip } from './demo-shared'

export const LazyHStackDemo: FC = () => {
  const spacing = useBinding('10')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
          <LazyHStack spacing={10}>
            <Chip title="LazyHStack" />
            <Chip title="Horizontal" />
            <Chip title="Scrollable" />
          </LazyHStack>
        </ScrollView>
      </FormSection>
      <PlaygroundSection
        title="LazyHStack Playground"
        preview={
          <ScrollView axes="horizontal" frame={{ maxWidth: 'infinity' }}>
            <LazyHStack spacing={toNumber(spacing.value, 10)}>
              <Chip title="LazyHStack" />
              <Chip title="Horizontal" />
              <Chip title="Scrollable" />
              <Chip title="Token Friendly" />
            </LazyHStack>
          </ScrollView>
        }
        form={<NumberField label="spacing" binding={spacing} />}
      />
    </VStack>
  )
}
