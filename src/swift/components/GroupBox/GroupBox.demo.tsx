import type { FC } from 'react'
import { FormSection } from '../../controls'
import { GroupBox } from './GroupBox'
import { Text } from '../runtime'
import { VStack } from '../VStack'

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
