import type { FC } from 'react'
import { Divider, HStack, Text, useBinding, VStack } from './runtime'
import { FormSection } from './controls'
import { EnumField, PlaygroundSection } from './demo-playground'

export const DividerDemo: FC = () => {
  const axis = useBinding<'horizontal' | 'vertical'>('horizontal')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>row 1</Text>
          <Divider />
          <Text>row 2</Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="Divider Playground"
        preview={
          axis.value === 'horizontal' ? (
            <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <Text>row 1</Text>
              <Divider />
              <Text>row 2</Text>
            </VStack>
          ) : (
            <HStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <Text>A</Text>
              <Divider axis="vertical" />
              <Text>B</Text>
            </HStack>
          )
        }
        form={
          <EnumField
            label="axis"
            binding={axis}
            options={[
              { label: 'horizontal', value: 'horizontal' },
              { label: 'vertical', value: 'vertical' },
            ]}
          />
        }
      />
    </VStack>
  )
}
