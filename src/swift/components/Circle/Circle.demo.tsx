import type { FC } from 'react'
import { FormSection } from '../../controls'
import { Circle } from './Circle'
import { HStack, Text } from '../runtime'
import { VStack } from '../VStack'

export const CircleDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Circle">
        <HStack spacing={16}>
          <Circle fill="blue" frame={{ width: 64, height: 64 }} />
          <Circle fill="green" frame={{ width: 88, height: 88 }} />
          <Circle fill="red" frame={{ width: 112, height: 112 }} padding={16}>
            <Text foregroundColor="#ffffff">88%</Text>
          </Circle>
        </HStack>
      </FormSection>
    </VStack>
  )
}
