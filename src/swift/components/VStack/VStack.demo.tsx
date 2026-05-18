import type { FC } from 'react'
import { HStack, Text } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";
import {FormSection} from "../FormSection";

export const VStackDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础纵向堆叠">
        <VStack spacing={8} alignment="leading" padding={12} background={{ fill: 'blue', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <Text font="caption.semibold" foregroundColor="#ffffff">parent VStack</Text>
          <HStack padding={{ horizontal: 10, vertical: 8 }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}>
            <Text>row 1</Text>
          </HStack>
          <HStack padding={{ horizontal: 10, vertical: 8 }} background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}>
            <Text>row 2</Text>
          </HStack>
          <HStack padding={{ horizontal: 10, vertical: 8 }} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}>
            <Text>row 3</Text>
          </HStack>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="对齐与间距"
        summary="对比 leading、center、trailing 三种 alignment，顺带展示不同 spacing。"
        preview={
          <HStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <VStack spacing={6} alignment="leading" padding={12} frame={{ width: 180, alignment: 'leading' }} background={{ fill: 'blue', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text font="caption" foregroundColor="#ffffff">leading / 6</Text>
              <Text>left</Text>
              <Text>stack</Text>
              <Text>preview</Text>
            </VStack>
            <VStack spacing={12} alignment="center" padding={12} frame={{ width: 180 }} background={{ fill: 'green', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text font="caption" foregroundColor="#ffffff">center / 12</Text>
              <Text>center</Text>
              <Text>stack</Text>
              <Text>preview</Text>
            </VStack>
            <VStack spacing={18} alignment="trailing" padding={12} frame={{ width: 180, alignment: 'trailing' }} background={{ fill: 'red', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text font="caption" foregroundColor="#ffffff">trailing / 18</Text>
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
