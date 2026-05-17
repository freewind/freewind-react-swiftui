import type { FC } from 'react'
import { GeometryReader, HStack, Text } from '../runtime'
import { PlaygroundSection } from '../../demo-playground'
import { ComponentPropsTable } from '../../props-table'
import {VStack} from "../VStack";
import {FormSection} from "../FormSection";

export const GeometryReaderDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="读取容器尺寸">
        <GeometryReader
          padding={12}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          frame={{ maxWidth: 'infinity' }}
        >
          {proxy => <Text font="caption2.monospaced">width: {String(proxy.size.width)} height: {String(proxy.size.height)}</Text>}
        </GeometryReader>
      </FormSection>
      <PlaygroundSection
        title="不同背景层"
        summary="保持同样尺寸读取逻辑，只切换外层背景与容器宽度。"
        preview={
          <HStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <GeometryReader
              padding={12}
              background={{ fill: 'secondary', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
              frame={{ width: 260 }}
            >
              {proxy => <Text font="caption2.monospaced" foregroundColor="#ffffff">width: {String(proxy.size.width)}</Text>}
            </GeometryReader>
            <GeometryReader
              padding={12}
              background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
              frame={{ width: 360 }}
            >
              {proxy => <Text font="caption2.monospaced">width: {String(proxy.size.width)}</Text>}
            </GeometryReader>
          </HStack>
        }
      />
      <ComponentPropsTable component="GeometryReader" />
    </VStack>
  )
}
