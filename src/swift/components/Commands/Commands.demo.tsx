import type { FC } from 'react'
import { Commands } from './Commands'
import { Button } from '../Button'
import { Text, useSceneLifecycle } from '../runtime'
import { VStack } from '../VStack'
import { FormSection } from '../FormSection'

export const CommandsDemo: FC = () => {
  const lifecycle = useSceneLifecycle()
  return (
    <VStack spacing={18} frame={{ maxWidth: 'infinity', alignment: 'leading' }}>
      <FormSection title="Commands">
        <Commands id="file-menu" title="File">
          <Button title="New Window" buttonStyle="plain" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Button title="Close" buttonStyle="plain" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
        </Commands>
        <Commands id="edit-menu" title="Edit">
          <Button title="Undo" buttonStyle="plain" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Button title="Redo" buttonStyle="plain" frame={{ maxWidth: 'infinity', alignment: 'leading' }} />
          <Text font="caption" foregroundStyle="secondary">
            command menu stub
          </Text>
        </Commands>
        <Text font="caption2.monospaced" foregroundStyle="tertiary">
          {JSON.stringify(lifecycle.value.commands)}
        </Text>
      </FormSection>
    </VStack>
  )
}
