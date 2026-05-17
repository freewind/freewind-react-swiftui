import type { FC } from 'react'
import { FormSection } from '../../controls'
import { Capsule } from './Capsule'
import { Text } from '../runtime'
import { VStack } from '../VStack'

export const CapsuleDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Capsule">
        <Capsule fill="accentColor" frame={{ width: 180, height: 48 }} padding={12}>
          <Text foregroundColor="#ffffff">Capsule</Text>
        </Capsule>
      </FormSection>
    </VStack>
  )
}
