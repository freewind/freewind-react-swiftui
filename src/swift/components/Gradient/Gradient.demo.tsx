import type { FC } from 'react'
import { FormSection } from '../../controls'
import { Gradient } from './Gradient'
import { Text } from '../runtime'
import { VStack } from '../VStack'

export const GradientDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Gradient">
        <Gradient colors={['#0a84ff', '#7c3aed', '#f43f5e']} frame={{ width: 320, height: 160 }} padding={18}>
          <Text foregroundColor="#ffffff">LinearGradient baseline</Text>
        </Gradient>
      </FormSection>
    </VStack>
  )
}
