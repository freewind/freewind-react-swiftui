import type { FC } from 'react'
import { HStack, RoundedRectangle, Text, VStack } from './runtime'
import { FormSection } from './controls'
import { PlaygroundSection } from './demo-playground'

export const RoundedRectangleDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础圆角容器">
        <RoundedRectangle fill="blue" cornerRadius={18} padding={18} frame={{ width: 220 }}>
          <Text foregroundColor="#ffffff">RoundedRectangle</Text>
        </RoundedRectangle>
      </FormSection>
      <PlaygroundSection
        title="不同填充与圆角"
        summary="对比 accent、material、红色强调三组容器。"
        preview={
          <HStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <RoundedRectangle fill="accentColor" cornerRadius={12} padding={18} frame={{ width: 180 }}>
              <Text foregroundColor="#ffffff">radius 12</Text>
            </RoundedRectangle>
            <RoundedRectangle fill="thinMaterial" cornerRadius={20} padding={18} frame={{ width: 180 }}>
              <Text>material 20</Text>
            </RoundedRectangle>
            <RoundedRectangle fill="red" cornerRadius={28} padding={18} frame={{ width: 180 }}>
              <Text foregroundColor="#ffffff">radius 28</Text>
            </RoundedRectangle>
          </HStack>
        }
      />
    </VStack>
  )
}
