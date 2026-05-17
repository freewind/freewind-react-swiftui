import type { FC } from 'react'
import { HStack, Text } from '../runtime'
import { FormSection } from '../../controls'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import { foregroundOptions } from '../../demo-shared'
import { VStack } from '../../components/VStack'

export const TokenColorDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="前景色 token">
        <VStack spacing={8} alignment="leading">
          {foregroundOptions.map(option => (
            <Text key={option.value} foregroundStyle={option.value}>
              {option.label}
            </Text>
          ))}
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="文字与背景配合"
        summary="一组看文字色，一组看 token 做背景时的表现。"
        preview={
          <VStack spacing={12} alignment="leading" frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <HStack spacing={10}>
              <Text foregroundStyle="accentColor">accentColor</Text>
              <Text foregroundStyle="green">green</Text>
              <Text foregroundStyle="red">red</Text>
            </HStack>
            <HStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <HStack padding={18} background={{ fill: 'accentColor', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
                <Text foregroundColor="#ffffff">accent background</Text>
              </HStack>
              <HStack padding={18} background={{ fill: 'secondary', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
                <Text foregroundColor="#ffffff">secondary background</Text>
              </HStack>
            </HStack>
          </VStack>
        }
      />
      <ComponentPropsTable component="TokenColor" />
    </VStack>
  )
}
