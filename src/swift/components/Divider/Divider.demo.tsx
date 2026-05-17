import type { FC } from 'react'
import { Divider, HStack, Text } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";
import {FormSection} from "../FormSection";

export const DividerDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="横向分隔">
        <VStack spacing={8} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
          <Text>row 1</Text>
          <Divider />
          <Text>row 2</Text>
        </VStack>
      </FormSection>
      <PlaygroundSection
        title="横向与纵向"
        summary="同一页对比默认 horizontal 与 vertical axis 的用法。"
        preview={
          <HStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <VStack spacing={8} frame={{ width: 220, alignment: 'leading' }}>
              <Text>row 1</Text>
              <Divider />
              <Text>row 2</Text>
            </VStack>
            <HStack spacing={8} padding={12} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text>A</Text>
              <Divider axis="vertical" />
              <Text>B</Text>
            </HStack>
          </HStack>
        }
      />
      <ComponentPropsTable component="Divider" />
    </VStack>
  )
}
