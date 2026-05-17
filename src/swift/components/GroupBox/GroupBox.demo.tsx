import type { FC } from 'react'
import { GroupBox } from './GroupBox'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import {FormSection} from "../FormSection";

export const GroupBoxDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="GroupBox">
        <GroupBox title="Storage">
          <Text>Downloads · 2.1 GB</Text>
        </GroupBox>
      </FormSection>
    </VStack>
  )
}
