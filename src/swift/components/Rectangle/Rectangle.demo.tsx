import type { FC } from 'react'
import { Rectangle } from './Rectangle'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const RectangleDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Rectangle">
        <Rectangle fill="green" frame={{ width: 280, height: 120 }} padding={14}>
          <Text foregroundColor="#ffffff">Rectangle</Text>
        </Rectangle>
      </FormSection>
    </VStack>
  )
}
