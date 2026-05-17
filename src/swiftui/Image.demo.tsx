import type { FC } from 'react'
import { HStack, Image, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'
import { ComponentPropsTable } from './props-table'

export const ImageDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="系统图标">
        <HStack spacing={12}>
          <Image systemName="iphone" />
          <Image systemName="laptopcomputer" />
          <Image systemName="pin.fill" />
          <Image systemName="photo" />
          <Image systemName="doc" />
        </HStack>
      </FormSection>
      <PlaygroundSection
        title="图标容器组合"
        summary="展示不同 systemName 搭配 padding、background 的效果。"
        preview={
          <HStack spacing={12}>
            <Image systemName="photo" padding={8} background={{ fill: 'tertiary', in: { kind: 'roundedRectangle', cornerRadius: 12 } }} />
            <Image systemName="doc" padding={8} background={{ fill: 'thinMaterial', in: { kind: 'capsule' } }} />
            <Image systemName="pin.fill" padding={8} background={{ fill: 'accentColor', in: { kind: 'roundedRectangle', cornerRadius: 12 } }} foregroundColor="#ffffff" />
          </HStack>
        }
      />
      <ComponentPropsTable component="Image" />
    </VStack>
  )
}
