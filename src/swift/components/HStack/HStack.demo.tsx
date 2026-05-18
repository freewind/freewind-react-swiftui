import type { FC } from 'react'
import { HStack, Spacer, Text } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";
import {FormSection} from "../FormSection";

export const HStackDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础横向排布">
        <HStack spacing={12} padding={12} background={{ fill: 'blue', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
          <VStack padding={10} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}>
            <Text>A</Text>
          </VStack>
          <VStack padding={10} background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}>
            <Text>B</Text>
          </VStack>
          <VStack padding={10} background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 12 } }}>
            <Text>C</Text>
          </VStack>
        </HStack>
      </FormSection>
      <PlaygroundSection
        title="混合内容与分布"
        summary="展示 HStack 与 Spacer 的组合，以及不同块宽度的横向占位。"
        preview={
          <VStack spacing={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <HStack spacing={10} padding={12} frame={{ maxWidth: 'infinity' }} background={{ fill: 'blue', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
              <Text foregroundColor="#ffffff">Leading</Text>
              <Spacer />
              <Text foregroundColor="#ffffff">Trailing</Text>
            </HStack>
            <HStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
              <VStack padding={12} frame={{ width: 160 }} background={{ fill: 'blue', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
                <Text foregroundColor="#ffffff">fixed 160</Text>
              </VStack>
              <VStack padding={12} frame={{ width: 220 }} background={{ fill: 'green', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
                <Text foregroundColor="#ffffff">fixed 220</Text>
              </VStack>
              <VStack padding={12} frame={{ maxWidth: 'infinity', alignment: 'leading' }} background={{ fill: 'red', in: { kind: 'roundedRectangle', cornerRadius: 16 } }}>
                <Text foregroundColor="#ffffff">flex fill</Text>
              </VStack>
            </HStack>
          </VStack>
        }
      />
      <ComponentPropsTable component="HStack" />
    </VStack>
  )
}
