import type { FC } from 'react'
import { GeometryReader, Text, useBinding, VStack, type ForegroundStyleToken } from './runtime'
import { FormSection } from './controls'
import { EnumField, PlaygroundSection } from './demo-playground'
import { foregroundOptions } from './demo-shared'

export const GeometryReaderDemo: FC = () => {
  const fill = useBinding<ForegroundStyleToken>('secondary')

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="静态例子">
        <GeometryReader
          padding={12}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          frame={{ maxWidth: 'infinity' }}
        >
          {proxy => <Text font="caption2.monospaced">width: {String(proxy.size.width)} height: {String(proxy.size.height)}</Text>}
        </GeometryReader>
      </FormSection>
      <PlaygroundSection
        title="GeometryReader Playground"
        preview={
          <GeometryReader
            padding={12}
            background={{ fill: fill.value, in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
            frame={{ maxWidth: 'infinity' }}
          >
            {proxy => <Text font="caption2.monospaced">width: {String(proxy.size.width)} height: {String(proxy.size.height)}</Text>}
          </GeometryReader>
        }
        form={<EnumField label="background.fill" binding={fill} options={foregroundOptions} />}
      />
    </VStack>
  )
}
