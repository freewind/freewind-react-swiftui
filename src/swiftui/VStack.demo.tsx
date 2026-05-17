import type { FC } from 'react'
import { HStack, Text, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'
import { ComponentPropsTable } from './props-table'

export const VStackDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础纵向堆叠">
        <VStack spacing={8} alignment="leading" padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <Text>row 1</Text>
          <Text>row 2</Text>
          <Text>row 3</Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="对齐与间距"
        summary="对比 leading、center、trailing 三种 alignment，顺带展示不同 spacing。"
        preview={
          <HStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <VStack spacing={6} alignment="leading" padding={12} frame={{ width: 180, alignment: 'leading' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text font="caption" foregroundStyle="secondary">leading / 6</Text>
              <Text>left</Text>
              <Text>stack</Text>
              <Text>preview</Text>
            </VStack>
            <VStack spacing={12} alignment="center" padding={12} frame={{ width: 180 }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text font="caption" foregroundStyle="secondary">center / 12</Text>
              <Text>center</Text>
              <Text>stack</Text>
              <Text>preview</Text>
            </VStack>
            <VStack spacing={18} alignment="trailing" padding={12} frame={{ width: 180, alignment: 'trailing' }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text font="caption" foregroundStyle="secondary">trailing / 18</Text>
              <Text>right</Text>
              <Text>stack</Text>
              <Text>preview</Text>
            </VStack>
          </HStack>
        }
      />
      <ComponentPropsTable component="VStack" />
    </VStack>
  )
}
