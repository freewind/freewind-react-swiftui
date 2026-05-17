import type { FC } from 'react'
import { WindowGroup } from './WindowGroup'
import { Button, SceneLifecycleProvider, Text, useSceneLifecycle, useWindowAction } from '../runtime'
import { FormSection } from '../FormSection'
import { HStack } from '../HStack'
import { VStack } from '../VStack'

export const WindowGroupDemo: FC = () => {
  return (
    <SceneLifecycleProvider>
      <WindowGroupDemoInner />
    </SceneLifecycleProvider>
  )
}

const WindowGroupDemoInner: FC = () => {
  const lifecycle = useSceneLifecycle()
  const windowAction = useWindowAction()

  return (
    <FormSection title="WindowGroup">
      <VStack spacing={10} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
        <WindowGroup
          id="preview.window"
          minWidth={360}
          minHeight={220}
          defaultWidth={520}
          defaultHeight={320}
          title="Preview Window"
          subtitle="macOS chrome shell"
        >
          <Text>Window scoped root shell.</Text>
        </WindowGroup>
        <HStack spacing={10}>
          <Button
            title="Open Utility"
            buttonStyle="bordered"
            onPress={() =>
              windowAction.openWindow({
                id: 'utility.window',
                title: 'Utility',
                isKeyWindow: false,
                defaultWidth: 420,
                defaultHeight: 280,
              })
            }
          />
          <Button title="Close Utility" buttonStyle="plain" onPress={() => windowAction.closeWindow('utility.window')} />
        </HStack>
        <Text font="caption2.monospaced" foregroundStyle="secondary">
          {JSON.stringify(lifecycle.value.windows)}
        </Text>
      </VStack>
    </FormSection>
  )
}
