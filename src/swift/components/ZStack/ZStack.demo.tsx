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
        <ZStack frame={{ width: 240, height: 180 }}>
          <RoundedRectangle fill="thinMaterial" frame={{ width: 220, height: 160 }} />
          <Circle fill="accentColor" frame={{ width: 96, height: 96 }} />
          <Text foregroundColor="#ffffff">Overlay</Text>
        </ZStack>
      </FormSection>
    </VStack>
  )
}
