import type { FC } from 'react'
import { FormSection } from '../../controls'
import { Scene } from './Scene'
import { Text } from '../runtime'
import { VStack } from '../VStack'

export const SceneDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Scene">
        <Scene>
          <Text>Scene acts as lifecycle/root grouping shell.</Text>
        </Scene>
      </FormSection>
    </VStack>
  )
}
