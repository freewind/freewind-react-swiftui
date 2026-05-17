import type { FC } from 'react'
import { HStack, Text, useBinding, VStack, type ForegroundStyleToken } from './runtime'
import { FormSection } from './controls'
import { EnumField, PlaygroundSection } from './demo-playground'
import { foregroundOptions } from './demo-shared'

export const TokenColorDemo: FC = () => {
  const foreground = useBinding<ForegroundStyleToken>('accentColor')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <VStack spacing={8} alignment="leading">
          {foregroundOptions.map(option => (
            <Text key={option.value} foregroundStyle={option.value}>
              {option.label}
            </Text>
          ))}
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="Token Color Playground"
        preview={
          <VStack spacing={12} alignment="leading">
            <Text foregroundStyle={foreground.value}>foregroundStyle preview</Text>
            <HStack padding={18} background={{ fill: foreground.value, in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text foregroundColor="#ffffff">background token preview</Text>
            </HStack>
          </VStack>
        }
        form={<EnumField label="foregroundStyle" binding={foreground} options={foregroundOptions} />}
      />
    </VStack>
  )
}
