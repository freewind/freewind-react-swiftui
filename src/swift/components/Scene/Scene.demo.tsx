import type { FC } from 'react'
import { Scene } from './Scene'
import { Text } from '../runtime'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'

export const SceneDemo: FC = () => {
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Scene">
        <Scene id="settings.scene" role="settings" title="Settings Scene">
          <Text>Scene acts as lifecycle/root grouping shell.</Text>
        </Scene>
      </FormSection>
    </VStack>
  )
}
