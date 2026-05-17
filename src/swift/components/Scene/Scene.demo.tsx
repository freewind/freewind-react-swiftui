import type { FC } from 'react'
import { Scene } from './Scene'
import { SceneLifecycleProvider, Text, useSceneLifecycle } from '../runtime'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'

export const SceneDemo: FC = () => {
  return (
    <SceneLifecycleProvider>
      <SceneDemoInner />
    </SceneLifecycleProvider>
  )
}

const SceneDemoInner: FC = () => {
  const lifecycle = useSceneLifecycle()

  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Scene">
        <Scene id="settings.scene" role="settings" title="Settings Scene">
          <Text>Scene acts as lifecycle/root grouping shell.</Text>
        </Scene>
        <Text font="caption2.monospaced" foregroundStyle="tertiary">
          {JSON.stringify(lifecycle.value.scenes)}
        </Text>
      </FormSection>
    </VStack>
  )
}
