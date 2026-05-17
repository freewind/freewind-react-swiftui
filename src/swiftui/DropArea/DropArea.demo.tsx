import type { FC } from 'react'
import { DropArea, HStack, Text } from '../runtime'
import { FormSection } from '../controls'
import { PlaygroundSection } from '../demo-playground'
import { ComponentPropsTable } from '../props-table'
import {VStack} from "../VStack";

export const DropAreaDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="基础拖放区域">
        <DropArea
          padding={12}
          background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
          frame={{ maxWidth: 'infinity' }}
        >
          <Text>DropArea mock，对应 SwiftUI `onDrop` 语义。</Text>
        </DropArea>
      </FormSection>
      <PlaygroundSection
        title="普通态与 targeted"
        summary="对比未命中与已命中拖放态的视觉差异。"
        preview={
          <HStack spacing={14} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
            <DropArea
              padding={12}
              background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
              frame={{ width: 280 }}
            >
              <Text>idle state</Text>
            </DropArea>
            <DropArea
              isTargeted={{ value: true, setValue: () => {} }}
              padding={12}
              background={{ fill: 'thinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 14 } }}
              frame={{ width: 280 }}
            >
              <Text>targeted state</Text>
            </DropArea>
          </HStack>
        }
      />
      <ComponentPropsTable component="DropArea" />
    </VStack>
  )
}
