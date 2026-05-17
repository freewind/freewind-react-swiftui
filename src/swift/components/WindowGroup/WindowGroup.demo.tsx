import type { FC } from 'react'
import { WindowGroup } from './WindowGroup'
import { Text, useSceneLifecycle } from '../runtime'
import { FormSection } from '../FormSection'
import { VStack } from '../VStack'

export const WindowGroupDemo: FC = () => {
  const lifecycle = useSceneLifecycle()
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
        <Text font="caption2.monospaced" foregroundStyle="secondary">
          {JSON.stringify(lifecycle.value.windows)}
        </Text>
      </VStack>
    </FormSection>
  )
}
