import type { FC } from 'react'
import { Color } from './Color'
import { HStack, Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const ColorDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Color">
        <HStack spacing={12}>
          <Color tone="blue" frame={{ width: 96, height: 96 }} />
          <Color tone="green" frame={{ width: 96, height: 96 }} />
          <Color tone="red" frame={{ width: 96, height: 96 }} overlay={<Text foregroundColor="#fff">Accent</Text>} />
        </HStack>
      </FormSection>
    </VStack>
  )
}
