import type { FC } from 'react'
import { ZStack } from './ZStack'
import { Circle } from '../Circle/Circle'
import { RoundedRectangle, Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const ZStackDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="ZStack">
        <ZStack
          frame={{ width: 260, height: 200 }}
          background={{ fill: 'ultraThinMaterial', in: { kind: 'roundedRectangle', cornerRadius: 18 } }}
        >
          <RoundedRectangle fill="blue" frame={{ width: 240, height: 180 }} />
          <RoundedRectangle fill="green" frame={{ width: 168, height: 116 }} />
          <Circle fill="red" frame={{ width: 92, height: 92 }} />
          <Text foregroundColor="#ffffff">top overlay</Text>
        </ZStack>
      </FormSection>
    </VStack>
  )
}
